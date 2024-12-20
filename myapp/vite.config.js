import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Markdown from 'vite-plugin-md';
import { code, meta, link } from 'md-powerpack';
import anchor from 'markdown-it-anchor'

export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      builders: [code(), meta(), link()], // Keep your existing builders
      markdownItSetup(md) {
        // Add markdown-it-anchor with configuration
        md.use(anchor, {
          permalink: false, // Add anchor links
          slugify: (str) =>
            str
              .trim()
              .toLowerCase()
              .replace(/[\s]+/g, '-') // Generate IDs for headings
              .replace(/[^\w-]+/g, ''), // Remove invalid characters
        });
      },
    }),
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
