#!/usr/bin/env node
/**
 * Detim Digital — skill exclusivity guard (Master Prompt §2).
 *
 * Each skill site is exclusive to its skill. This script fails the
 * build/lint if a forbidden term from the other skill appears in:
 *   (a) the content folders:  src/content/product-marketing/**, src/content/grants/**
 *   (b) the route folders:    src/app/product-marketing/**, src/app/grants-consulting/**
 *   (c) the prerendered HTML text of those routes (.next/server/app/**.html)
 *
 * Matching is case-insensitive and whole-word. Multi-word terms also match
 * a trailing plural ("ad set" catches "ad sets"). Prints file, line and
 * term for every violation, then exits 1.
 *
 * Run: bun run check:exclusivity   (also wired into `prebuild` and `lint`)
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

const FORBIDDEN: Record<"product-marketing" | "grants", readonly string[]> = {
  // Inside the Product Marketing site, these must never appear:
  "product-marketing": [
    "grant",
    "grants",
    "funding",
    "funder",
    "fundraising",
    "proposal",
    "nonprofit",
    "non-profit",
    "NGO",
    "SBIR",
    "STTR",
    "NSF",
    "NIH",
    "USAID",
    "SBA",
    "business plan",
    "trademark",
    "consultation",
    "consultations",
  ],
  // Inside the Grants & Business Consultations site, these must never appear:
  grants: [
    "product marketing",
    "PMM",
    "go-to-market",
    "GTM",
    "positioning",
    "SaaS",
    "Meta ads",
    "ad set",
    "ICP",
    "persona",
    "personas",
    "landing page",
  ],
};

type SiteKey = keyof typeof FORBIDDEN;

const SCAN_DIRS: ReadonlyArray<{ site: SiteKey; dir: string }> = [
  { site: "product-marketing", dir: "src/content/product-marketing" },
  { site: "product-marketing", dir: "src/app/product-marketing" },
  { site: "grants", dir: "src/content/grants" },
  { site: "grants", dir: "src/app/grants-consulting" },
];

const PRERENDER_DIR = join(ROOT, ".next", "server", "app");
const TEXT_EXT = /\.(ts|tsx|js|jsx|mjs|md|mdx|txt|json|css|html)$/i;

interface Violation {
  site: SiteKey;
  term: string;
  file: string;
  line: number;
}

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildRegex(term: string): RegExp {
  const body = escapeRegExp(term).replace(/\s+/g, "\\s+");
  // Multi-word terms may take a trailing plural "s" (e.g. "ad set" -> "ad sets").
  const plural = term.includes(" ") ? "s?" : "";
  return new RegExp(`(?<![a-zA-Z0-9])${body}${plural}(?![a-zA-Z0-9])`, "gi");
}

const REGEXES: Record<SiteKey, ReadonlyArray<{ term: string; re: RegExp }>> = {
  "product-marketing": FORBIDDEN["product-marketing"].map((term) => ({
    term,
    re: buildRegex(term),
  })),
  grants: FORBIDDEN.grants.map((term) => ({ term, re: buildRegex(term) })),
};

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function lineOf(content: string, index: number): number {
  return content.slice(0, index).split(/\r?\n/).length;
}

function checkTextFile(site: SiteKey, file: string): Violation[] {
  const src = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  const found: Violation[] = [];
  const lines = src.split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const { term, re } of REGEXES[site]) {
      re.lastIndex = 0;
      if (re.test(line)) found.push({ site, term, file: rel, line: i + 1 });
    }
  });
  return found;
}

function checkPrerendered(): { violations: Violation[]; skipped: boolean } {
  if (!existsSync(PRERENDER_DIR)) return { violations: [], skipped: true };
  const htmlFiles = walk(PRERENDER_DIR).filter(
    (f) =>
      f.endsWith(".html") &&
      /(product-marketing|grants-consulting)/.test(f)
  );
  const violations: Violation[] = [];
  for (const file of htmlFiles) {
    const site: SiteKey = file.includes("product-marketing")
      ? "product-marketing"
      : "grants";
    const html = readFileSync(file, "utf8");
    const rel = relative(ROOT, file);
    for (const { term, re } of REGEXES[site]) {
      re.lastIndex = 0;
      let m: RegExpExecArray | null = re.exec(html);
      while (m !== null) {
        violations.push({ site, term, file: rel, line: lineOf(html, m.index) });
        m = re.exec(html);
      }
    }
  }
  return { violations, skipped: false };
}

function main(): void {
  console.log("Detim Digital — exclusivity guard (Master Prompt §2)");
  const violations: Violation[] = [];
  let scanned = 0;

  for (const { site, dir } of SCAN_DIRS) {
    const abs = join(ROOT, dir);
    if (!existsSync(abs)) {
      console.warn(`  ! missing directory: ${dir}`);
      continue;
    }
    for (const file of walk(abs)) {
      if (!TEXT_EXT.test(file)) continue;
      scanned += 1;
      violations.push(...checkTextFile(site, file));
    }
  }

  const prerender = checkPrerendered();
  violations.push(...prerender.violations);

  if (prerender.skipped) {
    console.log("  prerendered HTML not found — route-output check skipped (runs after a build)");
  } else {
    console.log("  prerendered route HTML checked");
  }

  if (violations.length > 0) {
    console.error(`\nEXCLUSIVITY VIOLATIONS (${violations.length}):`);
    for (const v of violations) {
      console.error(`  [${v.site}] "${v.term}" -> ${v.file}:${v.line}`);
    }
    console.error(
      "\nFix: use the displayName / displayTitle fields from the content files (Master Prompt §2)."
    );
    process.exit(1);
  }

  console.log(
    `  OK — no exclusivity violations in ${scanned} source file(s)${prerender.skipped ? "" : " + prerendered HTML"}`
  );
}

main();
