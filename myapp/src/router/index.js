import { createWebHistory, createRouter } from 'vue-router';

import HomeView from '@/views/Home.vue';
import AboutView from '@/views/About.vue';
import TimelineView from '@/views/Timeline.vue';
import BlogPostView from '@/views/BlogPost.vue';
import ThemePageView from '@/views/ThemePage.vue';
import SearchResultsView from '@/views/SearchResults.vue';
import blogFrontmatter from '@/data/blog-frontmatter.json';
import { blogPostLocation } from '@/utils/postPaths';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'Notes - Home' },
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { title: 'Notes - About Me' },
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: TimelineView,
    meta: { title: 'Notes - Timeline' },
  },
  {
    path: '/themes/space-systems',
    name: 'ThemeSpaceSystems',
    component: ThemePageView,
    meta: {
      title: 'Notes - Space Systems',
      themePage: {
        heading: 'Space Systems',
        heroAriaLabel: 'Space Systems overview',
        description:
          'This page collects notes on the systems that make space missions possible—from spacecraft subsystems '
          + 'and payloads to the ground segment that operates them. You’ll find topics spanning satellites, ground '
          + 'systems, orbits, and mission operations.',
      },
    },
  },
  {
    path: '/themes/engineering',
    name: 'ThemeEngineering',
    component: ThemePageView,
    meta: {
      title: 'Notes - Engineering',
      themePage: {
        heading: 'Engineering',
        heroAriaLabel: 'Engineering overview',
        description:
          'This page collects notes across core engineering disciplines: structures, fluids, dynamics, and the '
          + 'methods used to design and verify complex systems. Expect material on fundamentals, analysis, and how '
          + 'theory meets hardware in real programs.',
      },
    },
  },
  {
    path: '/themes/software-and-ai',
    name: 'ThemeSoftwareAi',
    component: ThemePageView,
    meta: {
      title: 'Notes - Software and AI',
      themePage: {
        heading: 'Software and AI',
        heroAriaLabel: 'Software and AI overview',
        description:
          'This page collects notes on software architecture, implementation, and the tools that shape modern '
          + 'systems—including machine learning and AI. You’ll find topics spanning programming, developer workflows, '
          + 'intelligent automation, and reliable software in production.',
      },
    },
  },
  {
    path: '/themes/life-and-learning',
    name: 'ThemeLifeAndLearning',
    component: ThemePageView,
    meta: {
      title: 'Notes - Life and Learning',
      themePage: {
        heading: 'Life and Learning',
        heroAriaLabel: 'Life and Learning overview',
        description:
          'This page collects notes that don’t sit in a single technical lane—reflections on career, learning deeply, '
          + 'and how we work and grow alongside hard problems. Articles here are tagged as Miscellaneous or Music and '
          + 'span habits, ideas, and the human side of building things.',
      },
    },
  },
  {
    path: '/themes/:theme/:slug',
    name: 'BlogPost',
    component: BlogPostView,
    meta: { title: 'Blog' },
    props: true,
  },
  {
    path: '/posts/:slug',
    redirect: (to) => {
      const slug = to.params.slug;
      const post = blogFrontmatter.find((p) => p.slug === slug);
      const topic = post?.topic ?? 'Miscellaneous';
      return blogPostLocation(slug, topic);
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchResultsView,
    meta: { title: 'Notes - Search' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  let title = to.meta.title;

  if (to.name === 'BlogPost' && to.params.slug) {
    title = `Notes - ${to.params.slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')}`;
  }

  document.title = title || 'page';

  next();
});

export default router;
