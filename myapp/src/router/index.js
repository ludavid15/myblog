import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home.vue'
import AboutView from '../views/About.vue'
import TimelineView from '../views/Timeline.vue'
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
    path: "/timeline",
    name: "Timeline",
    component: TimelineView,
    meta: { icon: "mdi-home", title: "Timeline" },
  },
  {
    path: '/posts/:slug', // Dynamic route for markdown posts
    name: 'BlogPost',
    component: BlogPost,
    meta: { title: "Blog" },
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Add a navigation guard to dynamically set the title
router.beforeEach((to, from, next) => {
  // Default to the meta title
  let title = to.meta.title;

  // If the route has a slug, customize the title
  if (to.name === 'BlogPost' && to.params.slug) {
    title = `Notes - ${to.params.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')}`;
  }

  // Update the document title
  document.title = title || 'Default Website Title';

  next();
});

export default router