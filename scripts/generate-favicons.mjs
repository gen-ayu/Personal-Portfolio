import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Primary SVG with rounded corners for modern browsers & desktop
// Proportions:
// Width/Height: 512
// Corner radius: rx="112" (~22% rounded squircle)
// Ring diameter: 334 (~65.2% of 512, radius = 167, stroke-width = 28)
// Dot diameter: 84 (~25.1% of ring diameter, radius = 42)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="112" fill="#111111"/>
  <circle cx="256" cy="256" r="167" fill="none" stroke="#F3EFE9" stroke-width="28"/>
  <circle cx="256" cy="256" r="42" fill="#FF5722"/>
</svg>
`;

// 2. Apple Touch SVG (Full bleed square, iOS applies its own rounded squircle mask)
const appleTouchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" fill="#111111"/>
  <circle cx="256" cy="256" r="167" fill="none" stroke="#F3EFE9" stroke-width="28"/>
  <circle cx="256" cy="256" r="42" fill="#FF5722"/>
</svg>
`;

/**
 * Creates a standard multi-resolution ICO file containing PNG streams
 */
function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const directorySize = 16 * count;
  let currentOffset = headerSize + directorySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved (0)
  header.writeUInt16LE(1, 2); // Type (1 = ICO)
  header.writeUInt16LE(count, 4); // Number of images

  const directoryEntries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // Size of image data
    entry.writeUInt32LE(currentOffset, 12); // Offset to image data
    directoryEntries.push(entry);
    currentOffset += item.buffer.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...pngBuffers.map(item => item.buffer)]);
}

async function generate() {
  console.log('Generating favicon assets...');

  // Write favicon.svg
  const svgPath = path.join(publicDir, 'favicon.svg');
  fs.writeFileSync(svgPath, faviconSvg.trim(), 'utf8');
  console.log('✓ Created public/favicon.svg');

  const svgBuffer = Buffer.from(faviconSvg);
  const appleSvgBuffer = Buffer.from(appleTouchSvg);

  // Generate 16x16 PNG
  const png16 = await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  console.log('✓ Created public/favicon-16x16.png');

  // Generate 32x32 PNG
  const png32 = await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  console.log('✓ Created public/favicon-32x32.png');

  // Generate 48x48 PNG (for ICO)
  const png48 = await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toBuffer();

  // Generate 180x180 Apple Touch Icon (solid background without transparency)
  const appleTouch180 = await sharp(appleSvgBuffer)
    .resize(180, 180)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch180);
  console.log('✓ Created public/apple-touch-icon.png');

  // Generate favicon.ico with 16x16, 32x32, 48x48
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Created public/favicon.ico');

  console.log('All favicon assets generated successfully!');
}

generate().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
