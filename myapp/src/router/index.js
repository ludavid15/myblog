import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home.vue'
import AboutView from '../views/About.vue'
import BlogPost from '@/views/BlogPost.vue'

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
  {
    path: '/posts/:slug', // Dynamic route for markdown posts
    name: 'BlogPost',
    component: BlogPost,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router