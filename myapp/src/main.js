import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons (optional)
import myCustomTheme from './plugins/vuetify.js'

// Components
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  display: {
    mobileBreakpoint: 'md',
  },
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme,
    }
  }
})

createApp(App).use(vuetify).use(router).mount('#app')

