import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname, relative } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const client = createClient({
  projectId: "jp3kooxh",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skgXU10Y9IptNGcgdrYN8Bw38szGTJBGZAdkXtCCdi8QcImYKqZtdeVNG4aQkS2fKaKrJrV405cEmREkAqLO27GvlxCVvUvZprd38VONvl54FmJA1EoaAVpZE7Nw9nt6LW7mXL6idDQLdEV3aEEjFlU5v0Q8LfC2tluwcDmfvDkaudHwrbfX",
  useCdn: false,
});

function getImages(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...getImages(full));
    } else if ([".png", ".jpg", ".jpeg", ".webp"].includes(extname(entry).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

const imagesDir = join(ROOT, "public", "images");
const images = getImages(imagesDir);

console.log(`Найдено ${images.length} изображений\n`);

const results = {};

for (const imgPath of images) {
  const relPath = relative(imagesDir, imgPath).replace(/\\/g, "/");
  const filename = relPath.replace(/\//g, "-");

  process.stdout.write(`Загружаю ${relPath}... `);

  try {
    const buffer = readFileSync(imgPath);
    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType: "image/png",
    });
    results[relPath] = asset._id;
    console.log(`✓ ${asset._id}`);
  } catch (err) {
    console.log(`✗ ${err.message}`);
  }
}

console.log("\n=== РЕЗУЛЬТАТ ===");
console.log(JSON.stringify(results, null, 2));
