import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.jsx', '.tsx'],
      requireEnv: true,
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
