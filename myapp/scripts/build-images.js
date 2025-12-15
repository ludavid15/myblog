import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const photosSrcDir = path.resolve("photos-src");
const outDir = path.resolve("public", "media");
const manifestPath = path.resolve("src", "data", "media-manifest.json");

const isImage = (name) => /\.(jpe?g|png|webp)$/i.test(name);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

// NEW: recursively find images and remember their relative folder
async function walk(dir, relDir = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];

  for (const e of entries) {
    const fullPath = path.join(dir, e.name);

    if (e.isDirectory()) {
      const nextRel = relDir ? path.posix.join(relDir, e.name) : e.name;
      results.push(...(await walk(fullPath, nextRel)));
    } else if (e.isFile() && isImage(e.name)) {
      results.push({ fullPath, relDir, filename: e.name });
    }
  }

  return results;
}

async function build() {
  const manifest = {};
  await ensureDir(outDir);
  await ensureDir(path.dirname(manifestPath));

  // CHANGED: replace flat readdir with recursive walk
  const images = await walk(photosSrcDir);

  for (const imgInfo of images) {
    const base = path.parse(imgInfo.filename).name; // e.g. "001-telescope"
    const img = sharp(imgInfo.fullPath);
    const meta = await img.metadata();

    const thumb = `${base}_thumb.webp`;
    const display = `${base}_display.webp`;

    // NEW: output folder mirrors input folder
    const outputFolder = imgInfo.relDir ? path.join(outDir, imgInfo.relDir) : outDir;
    await ensureDir(outputFolder);

    await img.clone()
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(path.join(outputFolder, thumb));

    await img.clone()
      .resize({ width: 2400, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(outputFolder, display));

    // CHANGED: manifest key includes folder: "<post-slug>/<base>"
    const id = imgInfo.relDir ? `${imgInfo.relDir}/${base}` : base;

    // CHANGED: URLs include folder
    const urlPrefix = imgInfo.relDir ? `/media/${imgInfo.relDir}/` : "/media/";

    manifest[id] = {
      thumb: `${urlPrefix}${thumb}`,
      display: `${urlPrefix}${display}`,
      width: meta.width,
      height: meta.height
    };
  }

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log("Images built");
}

build();
