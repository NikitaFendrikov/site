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

const IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".webp"];
const VIDEO_EXTS = [".mp4"];

function getAssets(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...getAssets(full));
    } else {
      const ext = extname(entry).toLowerCase();
      if (IMAGE_EXTS.includes(ext) || VIDEO_EXTS.includes(ext)) {
        results.push(full);
      }
    }
  }
  return results;
}

const imagesDir = join(ROOT, "public", "images");
const assets = getAssets(imagesDir);

console.log(`Найдено ${assets.length} файлов\n`);

const results = {};

for (const assetPath of assets) {
  const relPath = relative(imagesDir, assetPath).replace(/\\/g, "/");
  const filename = relPath.replace(/\//g, "-");
  const ext = extname(assetPath).toLowerCase();
  const isVideo = VIDEO_EXTS.includes(ext);

  process.stdout.write(`Загружаю ${relPath}... `);

  try {
    const buffer = readFileSync(assetPath);
    const asset = await client.assets.upload(isVideo ? "file" : "image", buffer, {
      filename,
      contentType: isVideo ? "video/mp4" : `image/${ext.slice(1)}`,
    });
    results[relPath] = asset._id;
    console.log(`✓ ${asset._id}`);
  } catch (err) {
    console.log(`✗ ${err.message}`);
  }
}

console.log("\n=== РЕЗУЛЬТАТ ===");
console.log(JSON.stringify(results, null, 2));
