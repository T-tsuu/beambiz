/**
 * Generates app/favicon.ico from the BeamMark SVG in components/Brand.tsx.
 *
 * The SVG markup is extracted from the component itself rather than copied, so
 * the favicon always matches the logo in the navbar. Re-run after editing the
 * mark: `node scripts/generate-favicon.mjs`
 *
 * Requires `sharp`, which ships with Next.js. The .ico is assembled by hand as
 * an ICO container holding PNG frames (supported by Windows Vista+ and every
 * modern browser).
 */
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "package.json"));
const sharp = require("sharp");

// Rendered sizes, smallest first. 0 encodes 256 in the ICO directory.
const SIZES = [16, 32, 48, 64, 128, 256];

/** Pulls the BeamMark <svg> out of the component and de-JSX-ifies it. */
async function readMarkSvg() {
  const source = await readFile(path.join(root, "components/Brand.tsx"), "utf8");
  const match = source.match(/<svg[\s\S]*?<\/svg>/);
  if (!match) {
    throw new Error("Could not find an <svg> element in components/Brand.tsx");
  }

  let svg = match[0]
    .replace(/\s*className=\{[^}]*\}/g, "")
    .replace(/\s*aria-hidden="true"/g, "")
    // JSX attribute names -> SVG attribute names (gradientUnits is already
    // correct and must stay camelCase, so these are mapped explicitly).
    .replaceAll("stopColor", "stop-color")
    .replaceAll("strokeWidth", "stroke-width")
    .replaceAll("strokeLinecap", "stroke-linecap")
    .replaceAll("strokeLinejoin", "stroke-linejoin")
    .replaceAll("{", "")
    .replaceAll("}", "");

  if (!svg.includes("xmlns")) {
    svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return svg;
}

/** ICO: 6-byte header + 16-byte directory entry per frame + PNG payloads. */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  const directory = Buffer.alloc(16 * images.length);
  let offset = header.length + directory.length;

  images.forEach(({ size, data }, i) => {
    const entry = i * 16;
    directory.writeUInt8(size >= 256 ? 0 : size, entry + 0); // width
    directory.writeUInt8(size >= 256 ? 0 : size, entry + 1); // height
    directory.writeUInt8(0, entry + 2); // palette colours
    directory.writeUInt8(0, entry + 3); // reserved
    directory.writeUInt16LE(1, entry + 4); // colour planes
    directory.writeUInt16LE(32, entry + 6); // bits per pixel
    directory.writeUInt32LE(data.length, entry + 8); // payload bytes
    directory.writeUInt32LE(offset, entry + 12); // payload offset
    offset += data.length;
  });

  return Buffer.concat([header, directory, ...images.map((i) => i.data)]);
}

const svg = await readMarkSvg();
const images = [];

for (const size of SIZES) {
  const data = await sharp(Buffer.from(svg), { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  images.push({ size, data });
}

const ico = buildIco(images);
await writeFile(path.join(root, "app/favicon.ico"), ico);

console.log(
  `app/favicon.ico written (${SIZES.join(", ")} px, ${(ico.length / 1024).toFixed(1)} KB)`,
);
