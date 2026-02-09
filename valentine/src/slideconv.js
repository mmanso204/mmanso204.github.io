import fs from "fs";
import path from "path";

// Path to public assets
const folder = path.join(process.cwd(), "public/assets");

// Only include supported files (images/videos)
const files = fs.readdirSync(folder).filter(f =>
  /\.(jpg|jpeg|png|gif|mp4)$/i.test(f)
);

// Build array of URLs
const slides = files.map(f => `/assets/${f}`);

// Write to slideshowData.js
const outputPath = path.join(process.cwd(), "slideshowData.js");
fs.writeFileSync(
  outputPath,
  `export const slides = ${JSON.stringify(slides, null, 2)};\n`
);

console.log(`slides array generated with ${slides.length} items`);
