import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.resolve(__dirname, '../syncsaga-api/public/build/.vite/manifest.json');
const destPath = path.resolve(__dirname, '../syncsaga-api/public/build/manifest.json');

try {
  if (fs.existsSync(sourcePath)) {
    const manifest = fs.readFileSync(sourcePath, 'utf8');
    fs.writeFileSync(destPath, manifest);
    console.log('✅ Successfully copied manifest.json to the expected Laravel location');
  } else {
    console.error('❌ Source manifest file not found at:', sourcePath);
  }
} catch (error) {
  console.error('❌ Error copying manifest file:', error);
}