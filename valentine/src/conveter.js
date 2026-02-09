// src/converter.js (ES module)
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Folder with HEIC files
const inputFolder = path.join(process.cwd(), "public/assets");
const outputFolder = inputFolder;

// Read HEIC files
const files = fs.readdirSync(inputFolder).filter(f => /\.heic$/i.test(f));

console.log(`Found ${files.length} HEIC files`);

for (const file of files) {
  const inputPath = path.join(inputFolder, file);
  const outputFileName = file.replace(/\.heic$/i, ".png");
  const outputPath = path.join(outputFolder, outputFileName);

  try {
    await sharp(inputPath).png().toFile(outputPath);
    console.log(`Converted ${file} → ${outputFileName}`);
    // Optional: delete original HEIC
    fs.unlinkSync(inputPath);
  } catch (err) {
    console.error(`Error converting ${file}:`, err);
  }
}
