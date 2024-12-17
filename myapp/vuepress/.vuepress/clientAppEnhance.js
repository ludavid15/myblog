import { defineClientAppEnhance } from '@vuepress/client';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Include Vuetify CSS

export default defineClientAppEnhance(({ app }) => {
  const vuetify = createVuetify();
  app.use(vuetify); // Register Vuetify globally
});
