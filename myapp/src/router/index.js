import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home.vue'
import AboutView from '../views/About.vue'
import BlogPost from "@/views/blogs/BlogPost.vue"

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
    path: '/:topic_path/:post_path',
    name: 'blog-post',
    component: BlogPost,
    props: route => ({
      topicPath: route.params.topic_path,
      postPath: route.params.post_path,
      meta: route.query.meta ? JSON.parse(route.query.meta) : null
    })
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router