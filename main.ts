// The Self-Checkout Is Judging You
// One funny line in the voice of a smug, judgmental self-checkout machine.
// Writes the line to (MAKEFUN_OUTPUT_DIR ?? "/output")/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Ice cream, frozen peas, and a single candle. I am not judging you. I am just telling the next customer.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Read-back check: the written file must match the validated line exactly.
if (readFileSync(outPath, "utf8") !== LINE + "\n") {
  throw new Error("entry.txt does not match the validated line");
}
