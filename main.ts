// gta6-clipper-01 entry (Node 22, standard library only):
// copies VIDEO.json from the repository root to /output/VIDEO.json.
// The entry is the video itself: a GTA 6 moment cut into a vertical
// clip, uploaded to YouTube as a public Short with the bounty's line
// and the entrant's make.fun play code in its description.
// VIDEO.json names the video's address on YouTube.
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
