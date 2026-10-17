import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

function copyDirectory(source, destination) {
  if (!existsSync(source)) {
    console.log(`Skipping missing directory: ${source}`);
    return;
  }

  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true, force: true });
  console.log(`Copied ${source} -> ${destination}`);
}

copyDirectory(".next/static", ".next/standalone/.next/static");
copyDirectory("public", ".next/standalone/public");
