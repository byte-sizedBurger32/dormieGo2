const fs = require('fs');
const path = require('path');

const inPath = path.join(__dirname, '..', 'public', 'icon.png');
const outPath = path.join(__dirname, '..', 'public', 'favicon.ico');

if (!fs.existsSync(inPath)) {
  console.error('Input icon.png not found at', inPath);
  process.exit(1);
}

const data = fs.readFileSync(inPath);

// Parse PNG IHDR to get width/height
function readUInt32BE(buf, offset) {
  return buf.readUInt32BE(offset);
}

let width = 0, height = 0;
if (data.length > 24 && data.toString('ascii', 12, 16) === 'IHDR') {
  width = readUInt32BE(data, 16);
  height = readUInt32BE(data, 20);
}

// Fallback to 256 if unknown
const w = width || 256;
const h = height || 256;

// Build ICO header
// ICONDIR
const ICONDIR = Buffer.alloc(6);
ICONDIR.writeUInt16LE(0, 0); // reserved
ICONDIR.writeUInt16LE(1, 2); // type 1 = ICO
ICONDIR.writeUInt16LE(1, 4); // count

// ICONDIRENTRY (16 bytes)
const entry = Buffer.alloc(16);
entry.writeUInt8(w >= 256 ? 0 : w, 0); // width (0 means 256)
entry.writeUInt8(h >= 256 ? 0 : h, 1); // height
entry.writeUInt8(0, 2); // color count
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // planes (1)
entry.writeUInt16LE(32, 6); // bitcount (32 if PNG)
entry.writeUInt32LE(data.length, 8); // bytes in resource
entry.writeUInt32LE(6 + 16, 12); // image offset (header + dir)

// Concatenate
const out = Buffer.concat([ICONDIR, entry, data]);
fs.writeFileSync(outPath, out);
console.log('Wrote', outPath, ' (embedded PNG size', w + 'x' + h + ')');

// Also copy icon.png to favicon-32x32.png as a safe fallback (not resized)
const fav32 = path.join(__dirname, '..', 'public', 'favicon-32x32.png');
fs.copyFileSync(inPath, fav32);
console.log('Copied', fav32);
