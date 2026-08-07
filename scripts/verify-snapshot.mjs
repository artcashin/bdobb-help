#!/usr/bin/env node
// Verifies one bdobb-help version-folder snapshot: every [[wikilink]]
// resolves to a page that exists within the same folder, and every image
// reference resolves to a file in that folder's attachments/. Run after
// editing any version folder — a broken cross-reference here ships as a
// dead link or missing image in BDOBB's Help window.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, relative } from "node:path";

const target = process.argv[2];
if (!target) {
  console.error("usage: node scripts/verify-snapshot.mjs <version-folder>");
  process.exit(1);
}
if (!existsSync(target)) {
  console.error(`no such folder: ${target}`);
  process.exit(1);
}

function walk(dir) {
  let out = [];
  for (const entry of readdirSync(dir)) {
    if (entry === "attachments" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out = out.concat(walk(full));
    else if (extname(entry) === ".md") out.push(full);
  }
  return out;
}

const files = walk(target);
const slugs = new Set(files.map((f) => f.split("/").pop().replace(/\.md$/, "")));
const attachmentsDir = join(target, "attachments");
const attachments = existsSync(attachmentsDir)
  ? new Set(readdirSync(attachmentsDir))
  : new Set();

let errors = 0;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const rel = relative(target, file);

  for (const m of text.matchAll(/\[\[([a-zA-Z0-9_-]+)/g)) {
    if (!slugs.has(m[1])) {
      console.error(`${rel}: broken wikilink [[${m[1]}]] — no such page in this snapshot`);
      errors++;
    }
  }

  for (const m of text.matchAll(/!\[[^\]]*\]\((\.{0,2}\/?attachments\/[^)]+)\)/g)) {
    const filename = m[1].split("/").pop();
    if (!attachments.has(filename)) {
      console.error(`${rel}: broken image reference ${m[1]} — ${filename} not in attachments/`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} problem(s) found in ${target}`);
  process.exit(1);
}
console.log(`${target}: ${files.length} pages, all wikilinks and images resolve.`);
