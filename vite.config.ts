import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/spa-crud-testing-work/',
  plugins: [react()],
  server: {
    open: '/spa-crud-testing-work/',
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          const info =
            assetInfo.name === 'string' ? assetInfo.name.split('.') : '';
          const extType = info[info.length - 1];
          if (
            /\.(png|jpe?g|gif|svg|webp|webm|mp3)$/.test(
              assetInfo.name as string,
            )
          ) {
            return `assets/[name]-[hash].${assetInfo.name}`;
          }
          if (/\.(css)$/.test(assetInfo.name as string)) {
            return `css/[name]-[hash].${assetInfo.name}`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name as string)) {
            return `fonts/[name]-[hash].${assetInfo.name}`;
          }
          return `[name]-[hash].${assetInfo.name}`;
        },
      },
    },
  },
});
