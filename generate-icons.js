/* ============================================================
   ExcuseGen — generate-icons.js
   Generates all required PWA icon sizes from a base SVG
   Run: node generate-icons.js  (requires: npm install sharp)
   ============================================================ */

const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

/* ── Base SVG icon ───────────────────────────────────────────── */
/* Dark background + green ⚡ bolt — matches brand */
const SVG = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="512" height="512" rx="96" fill="#080c13"/>
  <!-- Green glow blob -->
  <circle cx="256" cy="256" r="200" fill="rgba(34,197,94,0.08)"/>
  <!-- Outer ring -->
  <circle cx="256" cy="256" r="190" fill="none" stroke="rgba(34,197,94,0.3)" stroke-width="2"/>
  <!-- EG Monogram text -->
  <text x="256" y="200" font-family="Arial Black, sans-serif" font-weight="900"
        font-size="120" fill="#22c55e" text-anchor="middle" dominant-baseline="middle">EG</text>
  <!-- Lightning bolt icon below -->
  <text x="256" y="340" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif"
        font-size="110" text-anchor="middle" dominant-baseline="middle">⚡</text>
</svg>
`;

/* ── Required icon sizes ─────────────────────────────────────── */
const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

const outDir = path.join(__dirname, 'icons');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const svgBuffer = Buffer.from(SVG);

async function generateIcons() {
  console.log('Generating PWA icons…\n');

  for (const size of SIZES) {
    const outPath = path.join(outDir, `icon-${size}.png`);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`✅ icon-${size}.png`);
  }

  /* Generate maskable icon (with safe-zone padding ~10%) */
  const maskablePath = path.join(outDir, 'icon-maskable-512.png');
  const maskableSVG = SVG.replace('rx="96"', 'rx="0"'); /* Full bleed background */
  await sharp(Buffer.from(maskableSVG))
    .resize(512, 512)
    .png()
    .toFile(maskablePath);
  console.log('✅ icon-maskable-512.png');

  console.log('\n🎉 All icons generated in /icons/');
  console.log('📌 Upload the /icons/ folder alongside your HTML files on Netlify.');
}

generateIcons().catch(console.error);
