// gta6-clipper-01 entry (Node 22, standard library only):
// copies VIDEO.json from the repository root to /output/VIDEO.json.
// The entry is the video itself: a GTA 6 moment cut into a vertical
// clip, uploaded to YouTube as a public Short with the bounty's line
// and the entrant's make.fun play code in its description.
// VIDEO.json names the video's address on YouTube.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Validate VIDEO.json before copying: it must be {"url": "<YouTube Shorts address>"}.
// (An earlier revision used the key "video_url", which make.fun's entry_link
// check rejects — fail loudly here instead of shipping a bad link.)
const videoJsonPath = join(BOT_DIR, 'VIDEO.json');
let videoUrl: string;
try {
  const parsed: unknown = JSON.parse(readFileSync(videoJsonPath, 'utf8'));
  if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
    throw new Error('VIDEO.json must be {"url": "<YouTube Shorts address>"}');
  }
  videoUrl = (parsed as { url: string }).url;
} catch (err) {
  console.error(`VIDEO.json is not usable: ${(err as Error).message}`);
  process.exit(1);
}
if (!/^https:\/\/(www\.)?youtube\.com\/shorts\/[A-Za-z0-9_-]+/.test(videoUrl) && !/^https:\/\/youtu\.be\/[A-Za-z0-9_-]+/.test(videoUrl)) {
  console.error(`VIDEO.json url is not a YouTube Shorts address: ${videoUrl}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(videoJsonPath, join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
