import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MDS',
      formats: ['es', 'umd'],
      fileName: (format) => `mds.${format === 'es' ? 'js' : 'umd.cjs'}`,
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        // Preserve CSS files
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'mds.css';
          return assetInfo.name || 'asset';
        },
      },
    },
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Clear output directory before build
    emptyOutDir: true,
  },
});

