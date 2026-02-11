import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {

    // Загружаем переменные окружения
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.jsx'],
                refresh: true,
            }),
            react(),
        ],
        server: {
            port: 3000,
            host: '0.0.0.0',
            hmr: {
                host: env.VITE_HMR_HOST,

                protocol: 'ws',
                overlay: true,
            },
            watch: null,
            cors: true
        },
        build: {
            outDir: 'public/build',
        },
        optimizeDeps: {
            esbuildOptions: {
                loader: {
                    '.js': 'jsx'
                }
            }
        }
    };
});
