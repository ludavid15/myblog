import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home.vue'
import AboutView from '../views/About.vue'
import TimelineView from '../views/Timeline.vue'
import BlogPost from '@/views/BlogPost.vue'
import SpaceSystemsView from '../views/themes/SpaceSystems.vue'
import EngineeringView from '../views/themes/Engineering.vue'
import SoftwareAiView from '../views/themes/SoftwareAi.vue'
import LifeAndLearningView from '../views/themes/LifeAndLearning.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { title: "Notes - Home" },
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: { title: "Notes - About Me" },
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: TimelineView,
    meta: { title: "Notes - Timeline" },
  },
  {
    path: '/themes/space-systems',
    name: 'ThemeSpaceSystems',
    component: SpaceSystemsView,
    meta: { title: 'Notes - Space Systems' },
  },
  {
    path: '/themes/engineering',
    name: 'ThemeEngineering',
    component: EngineeringView,
    meta: { title: 'Notes - Engineering' },
  },
  {
    path: '/themes/software-and-ai',
    name: 'ThemeSoftwareAi',
    component: SoftwareAiView,
    meta: { title: 'Notes - Software and AI' },
  },
  {
    path: '/themes/life-and-learning',
    name: 'ThemeLifeAndLearning',
    component: LifeAndLearningView,
    meta: { title: 'Notes - Life and Learning' },
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
  scrollBehavior() {
    return { top: 0 }
  },
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
  document.title = title || 'page';

  next();
});

export default router