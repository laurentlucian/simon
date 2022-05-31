import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePluginFonts } from 'vite-plugin-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePluginFonts({
      custom: {
        families: [
          {
            name: 'MonoLisa',
            local: 'MonoLisa',
            src: './src/assets/MonoLisa-Regular.woff2',
          },
          {
            name: 'MonoLisa Bold',
            local: 'MonoLisa Bold',
            src: './src/assets/MonoLisa-Bold.otf',
          },
        ],
      },
    }),
  ],
});
