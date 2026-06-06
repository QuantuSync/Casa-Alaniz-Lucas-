import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    entry: 'src/main.tsx',
    // /historia -> dist/historia/index.html
    dirStyle: 'nested',
  },
});
