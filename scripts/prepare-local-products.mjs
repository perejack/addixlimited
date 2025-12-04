import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const srcImagesDir = path.join(root, 'src', 'images');
const publicProductsDir = path.join(root, 'public', 'images', 'products');
const csvPath = path.join(srcImagesDir, 'product_data.csv');
const outJson = path.join(root, 'public', 'data', 'seed-products.json');

function toSlug(s) {
  return s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeName(s) {
  return s.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

function parsePrice(str) {
  if (!str) return null;
  const cleaned = str.replace(/[^0-9.,]/g, '').replace(/,/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

function readCSVFixed(p) {
  let txt = fs.readFileSync(p, 'utf8');
  // Fix the concatenated line issue like: ...jpgPOULTRIES,... -> ...jpg\nPOULTRIES,...
  txt = txt.replace(/\.jpg(POULTRIES|INDUSTRIAL|HOUSEHOLD|GARDENING|FURNITURE)/g, '.jpg\n$1');
  const lines = txt.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const header = lines.shift();
  const rows = [];
  for (const line of lines) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === ',' && !inQuotes) { parts.push(current); current = ''; continue; }
      current += ch;
    }
    parts.push(current);
    if (parts.length >= 4) {
      rows.push({
        category: parts[0].trim(),
        name: parts[1].trim(),
        priceStr: parts[2].trim(),
        imageUrl: parts[3].trim(),
      });
    }
  }
  return rows;
}

function pickImageFileForName(files, name) {
  const norm = normalizeName(name);
  // Prefer webp, then png, then jpg/jpeg
  const webp = files.find(f => normalizeName(path.parse(f).name) === norm && f.toLowerCase().endsWith('.webp'));
  if (webp) return webp;
  const png = files.find(f => normalizeName(path.parse(f).name) === norm && f.toLowerCase().endsWith('.png'));
  if (png) return png;
  const jpg = files.find(f => normalizeName(path.parse(f).name) === norm && (f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg')));
  if (jpg) return jpg;
  // fallback: contains name
  const contains = files.find(f => normalizeName(path.parse(f).name).includes(norm));
  return contains || null;
}

async function main() {
  await ensureDir(publicProductsDir);
  await ensureDir(path.dirname(outJson));

  const allFiles = (await fs.promises.readdir(srcImagesDir)).filter(f => /(\.png|\.webp|\.jpg|\.jpeg)$/i.test(f));
  const rows = readCSVFixed(csvPath);

  const products = [];
  for (const r of rows) {
    const file = pickImageFileForName(allFiles, r.name);
    if (!file) {
      console.warn(`No local image found for: ${r.name}`);
      continue;
    }
    const ext = path.extname(file).toLowerCase();
    const slug = toSlug(r.name);
    const dest = path.join(publicProductsDir, `${slug}${ext}`);
    await fs.promises.copyFile(path.join(srcImagesDir, file), dest);

    products.push({
      name: r.name,
      category: r.category,
      price: parsePrice(r.priceStr),
      description: `Quality ${r.category.toLowerCase()} product: ${r.name}. Durable, affordable, and made for everyday use.`,
      image_url: `/images/products/${slug}${ext}`,
    });
  }

  await fs.promises.writeFile(outJson, JSON.stringify(products, null, 2));
  console.log(`Wrote ${products.length} products to ${outJson}`);
}

main().catch(err => { console.error(err); process.exit(1); });
