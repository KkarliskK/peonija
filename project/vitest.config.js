// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Use jsdom for simulating browser environment
    globals: true,        // Make describe, it, etc. globally available
    setupFiles: './src/setupTests.js', // Point to the setup file for jest-dom matchers
  },
});
