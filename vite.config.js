import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
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
        // hmr: false,
        hmr: {
            host: '192.168.56.104',
            port: 8088,

            // host: '0.0.0.0',
            // port: 3000,

            // host: '0.0.0.0',
            // port: 8088,

            protocol: 'ws',
            overlay: true,
        },
        // watch: {
        //     usePolling: true, // Важно для работы с Docker-томами
        //     interval: 60000
        // },
        watch: null,
        // hmr: {
        //     host: '0.0.0.0',
        //     port: 3000,
        //     protocol: 'ws',
        //     client: {
        //         host: '192.168.56.104' // URL, который видит браузер
        //     }
        // },
        cors: true
    },
    build: {
        outDir: 'public/build', // если нужно собрать в public папку
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx'
            }
        }
    }
});
