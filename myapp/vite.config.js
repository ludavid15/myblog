import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Markdown from 'vite-plugin-md';
import { code, meta, link } from 'md-powerpack';

export default defineConfig({
  plugins: [
    vue( {include: [/\.vue$/, /\.md$/],}),
    Markdown( {builders: [code(), meta(), link()], }),
  ],
  server: {
    historyApiFallback: true, // Enable fallback for SPA routing
    host: '0.0.0.0',          // Expose the server to external hosts (Docker)
  },
  resolve: {
    alias: {
      '@': '/src', // Ensures the @ alias still works for imports
    },
  },
});

console.log("✅ vite-plugin-md and other plugins are configured!");
