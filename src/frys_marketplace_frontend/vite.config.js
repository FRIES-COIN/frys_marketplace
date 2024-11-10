import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react()],
    define: {
        'import.meta.env.VITE_DFX_NETWORK': JSON.stringify(process.env.DFX_NETWORK || 'local'),
        'import.meta.env.VITE_CANISTER_ID_FRYS_MARKETPLACE_BACKEND': JSON.stringify(
            process.env.CANISTER_ID_FRYS_MARKETPLACE_BACKEND
        ),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'declarations': path.resolve(__dirname, './src/declarations')
        },
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            external: ['react', 'react-dom'],
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:4943',
                changeOrigin: true,
            },
        },
    },
});