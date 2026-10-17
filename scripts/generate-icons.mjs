/**
 * One-off icon generator: renders src/app/icon.svg into the Apple touch
 * icon expected by Next.js file conventions (src/app/apple-icon.png).
 * Run: node scripts/generate-icons.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const svgPath = join(here, "../src/app/icon.svg");
const outPath = join(here, "../src/app/apple-icon.png");

const svg = readFileSync(svgPath);

await sharp(svg, { density: 512 }).resize(180, 180).png().toFile(outPath);

console.log("src/app/apple-icon.png generated");
