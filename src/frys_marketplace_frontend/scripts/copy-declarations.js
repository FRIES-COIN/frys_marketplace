import { copyFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, '../../../.dfx/local/canisters/frys_marketplace_backend');
const targetDir = join(__dirname, '../src/declarations/frys_marketplace_backend');

// Create target directory if it doesn't exist
mkdirSync(targetDir, { recursive: true });

// Copy declaration files
const files = [
    'frys_marketplace_backend.did',
    'frys_marketplace_backend.did.d.ts',
    'frys_marketplace_backend.did.js'
];

files.forEach(file => {
    try {
        copyFileSync(
            join(sourceDir, file),
            join(targetDir, file)
        );
        console.log(`Copied ${file} successfully`);
    } catch (err) {
        console.error(`Error copying ${file}:`, err);
    }
});