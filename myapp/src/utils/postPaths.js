import topics from '@/data/topics.json';

const THEME_PREFIX = '/themes/';

function themeSegmentFromRoute(themeRoute) {
  if (!themeRoute?.startsWith(THEME_PREFIX)) return null;
  const rest = themeRoute.slice(THEME_PREFIX.length);
  return rest || null;
}

/** Last path segment of the theme index route, e.g. `/themes/engineering` → `engineering`. */
export function getThemeSegmentForTopic(topicName) {
  const entry = topics.find((t) => t.name === topicName);
  const route = entry?.theme?.route;
  const seg = route ? themeSegmentFromRoute(route) : null;
  return seg ?? 'life-and-learning';
}

/** Named location for a post (use with RouterLink `:to` or `router.push`). */
export function blogPostLocation(slug, topicName = 'Miscellaneous') {
  return {
    name: 'BlogPost',
    params: {
      theme: getThemeSegmentForTopic(topicName),
      slug,
    },
  };
}
