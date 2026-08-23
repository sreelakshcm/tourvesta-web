import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@types': path.join(__dirname, './src/types'),
      '@features': path.join(__dirname, './src/features'),
      '@pages': path.join(__dirname, './src/pages'),
      '@app': path.resolve(__dirname, './src/app'),
      '@constants': path.join(__dirname, './src/constants'),
      '@components': path.join(__dirname, './src/components'),
      '@styles': path.join(__dirname, './src/styles'),
      '@utils': path.join(__dirname, './src/utils'),
      '@assets': path.join(__dirname, './src/assets'),
    },
  },
});
