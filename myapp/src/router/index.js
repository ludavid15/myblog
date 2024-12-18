import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home.vue'
import AboutView from '../views/About.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { icon: "mdi-home", title: "Home" },
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: { icon: "mdi-home", title: "About Me" },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router