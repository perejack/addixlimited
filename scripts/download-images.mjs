import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Node 18+ has global fetch

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const imagesRoot = path.join(publicDir, 'images');

/**
 * List of images to download and store locally
 * You can safely re-run this script; it will overwrite existing files.
 */
const images = [
  // Company Story
  {
    url: 'https://www.kenpoly.com/?seraph_accel_gi=wp-content%2Fsmush-webp%2F2025%2F05%2Four-story.jpg.webp&n=JMferJmUKlCNUF3xnaA',
    out: path.join(imagesRoot, 'story', 'our-story.jpg.webp'),
  },

  // Latest Articles
  {
    url: 'https://www.kenpoly.com/wp-content/smush-webp/2025/07/plastic-basin.jpg.webp',
    out: path.join(imagesRoot, 'articles', 'plastic-basin.jpg.webp'),
  },
  {
    url: 'https://www.kenpoly.com/?seraph_accel_gi=wp-content%2Fsmush-webp%2F2025%2F07%2Fhans-isaacson-Mpdd1qA12g-unsplash.jpg.webp&n=VfT0LZ122B9GuGXolJ5dQ',
    out: path.join(imagesRoot, 'articles', 'hans-isaacson-Mpdd1qA12g-unsplash.jpg.webp'),
  },
  {
    url: 'https://www.kenpoly.com/?seraph_accel_gi=wp-content%2Fsmush-webp%2F2025%2F06%2Fannie-spratt-dBuUYGYkfj4-unsplash.jpg.webp&n=poxVbLN0GZDSQJ21F1e1w',
    out: path.join(imagesRoot, 'articles', 'annie-spratt-dBuUYGYkfj4-unsplash.jpg.webp'),
  },
  {
    url: "https://www.kenpoly.com/?seraph_accel_gi=wp-content%2Fsmush-webp%2F2025%2F06%2Fgetty-images-n6o6sXJON1I-unsplash.jpg.webp&n=tsQS2HKCvG2e28GaESqw",
    out: path.join(imagesRoot, 'articles', 'getty-images-n6o6sXJON1I-unsplash.jpg.webp'),
  },

  // Product Categories
  {
    url: 'https://www.kenpoly.com/wp-content/smush-webp/2024/07/ITM.0000919_kenchair_2014_all.jpg.webp',
    out: path.join(imagesRoot, 'categories', 'furniture.jpg.webp'),
  },
  {
    url: 'https://www.kenpoly.com/wp-content/smush-webp/2024/07/ITM.0001091_bamboowaste_all.jpg.webp',
    out: path.join(imagesRoot, 'categories', 'household.jpg.webp'),
  },
  {
    url: 'https://www.kenpoly.com/wp-content/smush-webp/2024/07/ITM.0000877_polyair_240_all.jpg.webp',
    out: path.join(imagesRoot, 'categories', 'industrial.jpg.webp'),
  },
  {
    url: 'https://www.kenpoly.com/wp-content/smush-webp/2024/07/ITM.0001152_rectangle_7_all.jpg.webp',
    out: path.join(imagesRoot, 'categories', 'gardening.jpg.webp'),
  },
  {
    url: 'https://www.kenpoly.com/wp-content/smush-webp/2024/07/ITM.0000701_luxurybaby_bath_all-400x457.jpg.webp',
    out: path.join(imagesRoot, 'categories', 'baby-kids.jpg.webp'),
  },
  {
    url: 'https://www.kenpoly.com/wp-content/smush-webp/2025/07/bento_lunch_box.png.webp',
    out: path.join(imagesRoot, 'categories', 'bottles-lunch-boxes.png.webp'),
  },
  {
    url: 'https://www.kenpoly.com/wp-content/smush-webp/2024/07/ITM.0000792_chick_feeder_all.jpg.webp',
    out: path.join(imagesRoot, 'categories', 'poultries.jpg.webp'),
  },
];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function download(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await ensureDir(path.dirname(outPath));
  await fs.promises.writeFile(outPath, buf);
  console.log(`Saved: ${outPath}`);
}

(async function main() {
  try {
    await ensureDir(imagesRoot);
    for (const item of images) {
      await download(item.url, item.out);
    }
    console.log('All images downloaded to public/images');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
