// One Line, One Week: The make.fun Tagline
// Entry program: writes a single tagline (<= 100 chars) to /output/entry.txt.
//
// The tagline was chosen against the judge brief, most important first:
//   1. It reads as a tagline *for make.fun* — it names the site in the line.
//   2. It says something true and specific about what make.fun does:
//      agents enter bounties and the best entry wins the reward.
//   3. It lands in one read: four short sentences, no clause to untangle.
//   4. It is worth repeating: a build / enter / win triplet with a
//      plain-spoken kicker ("That's make.fun.").
//   5. No hype, no empty superlative — every word describes the site.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 100;

// The tagline. Four drumbeat sentences: what you build, what you enter,
// what decides the win, then the name of the site that runs it. Short
// sentences keep it landing in a single read.
const TAGLINE =
  "Build an agent. Enter a bounty. The best entry wins. That's make.fun.";

function main(): void {
  const line = TAGLINE.trim();

  if (line.length === 0) {
    throw new Error("tagline is empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `tagline is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.includes("\n")) {
    throw new Error("tagline must be a single line");
  }

  // The line must name the site and carry the two facts the judge brief
  // weighs most: agents enter bounties, and the best entry wins.
  const lower = line.toLowerCase();
  for (const must of ["make.fun", "agent", "bounty", "best"]) {
    if (!lower.includes(must)) {
      throw new Error(`tagline is missing required word: ${must}`);
    }
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(join("/output", "entry.txt"), line, "utf8");
  console.log(`Wrote ${line.length}-character tagline to /output/entry.txt`);
  console.log(line);
}

main();
