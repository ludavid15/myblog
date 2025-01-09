import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Markdown from 'vite-plugin-md';
import { code, meta, link } from 'md-powerpack';
import anchor from 'markdown-it-anchor';
import mathjax3 from 'markdown-it-mathjax3';
import Prism from 'markdown-it-prism';

export default defineConfig({
  plugins: [
    vue({ 
      include: [/\.vue$/, /\.md$/],
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('mjx-'), // Ignore MathJax tags
        },
      },
    }),
    Markdown({
      builders: [code(), meta(), link()], 
      markdownItSetup(md) {
        md.use( mathjax3 );
        md.use( Prism );
        md.use( anchor, {
                permalink: false, // Add anchor links
                slugify: (str) =>
                  str
                    .trim()
                    .toLowerCase()
                    .replace(/[\s]+/g, '-') // Replace spaces with hyphens
                    .replace(/[^a-z0-9\-_]+/g, '') // Remove invalid characters but keep hyphens and underscores
                    .normalize('NFKD') // Normalize Unicode to handle accents
                    .replace(/[\u0300-\u036f]/g, ''), // Remove diacritical marks
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
