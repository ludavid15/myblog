import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons (optional)
import myCustomTheme from './plugins/vuetify.js'
import 'prismjs/themes/prism.css';

// Components
import App from './App.vue'
import router from './router'
import PostImage from './components/PostImage.vue'

import './assets/main.css'


const vuetify = createVuetify({
  components,
  directives,
  display: {
    mobileBreakpoint: 'md',
  },
  defaults: {
    VTypography: {
      style: {
        lineHeight: '1.7',
        letterSpacing: '0.005em',
      },
    },

    // Set default font for common components to sans-serif (Roboto)
    VBtn: {style: {fontFamily: 'Roboto, system-ui, sans-serif',},},
    VAppBar: {style: {fontFamily: 'Roboto, system-ui, sans-serif',},},
    VNavigationDrawer: {style: {fontFamily: 'Roboto, system-ui, sans-serif',},},
    VListItem: {style: {fontFamily: 'Roboto, system-ui, sans-serif',},},
    VChip: {style: {fontFamily: 'Roboto, system-ui, sans-serif',},},

    // Cards use bigger font for readability
    VCardText: {style: {fontSize: '1.05rem',},},

  },
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        ...myCustomTheme,
        typography: {
          // Headings = book headings
          h1: { fontFamily: '"Source Serif 4", Georgia, serif' },
          h2: { fontFamily: '"Source Serif 4", Georgia, serif' },
          h3: { fontFamily: '"Source Serif 4", Georgia, serif' },
          h4: { fontFamily: '"Source Serif 4", Georgia, serif' },
          h5: { fontFamily: '"Source Serif 4", Georgia, serif' },
          h6: { fontFamily: '"Source Serif 4", Georgia, serif' },
        },
      },
    }
  }
})

createApp(App)
  .component('PostImage', PostImage)
  .use(vuetify)
  .use(router)
  .mount('#app')
