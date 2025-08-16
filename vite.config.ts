import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    server: {
      host: '0.0.0.0',
      port: 8080,
      proxy: !isProduction ? {
        '/api': {
          target: process.env.VITE_API_URL || 'http://127.0.0.1:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
          ws: false,
        },
      } : undefined,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8080'),
    },
  };
});