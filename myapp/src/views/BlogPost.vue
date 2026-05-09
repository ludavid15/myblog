<template>
  <div class="page-shell">
    <div
      v-if="loading"
      class="blog-post-loading d-flex justify-center align-center"
      style="height: 300px;"
    >
      <v-progress-circular indeterminate size="64" color="primary" />
    </div>

    <template v-else>
      <section
        v-if="frontmatter && frontmatter.title"
        class="page-hero"
        aria-label="Article"
      >
        <div class="page-hero__grid">
          <div class="page-hero__copy">
            <nav class="page-breadcrumb" aria-label="Breadcrumb">
              <RouterLink class="page-breadcrumb__link" to="/">Home</RouterLink>
              <span class="page-breadcrumb__sep" aria-hidden="true">/</span>
              <RouterLink
                v-if="themeNav"
                class="page-breadcrumb__link"
                :to="themeNav.route"
              >
                {{ themeNav.label }}
              </RouterLink>
              <RouterLink
                v-else
                class="page-breadcrumb__link"
                to="/timeline"
              >
                Timeline
              </RouterLink>
              <span class="page-breadcrumb__sep" aria-hidden="true">/</span>
              <span class="page-breadcrumb__current">{{ breadcrumbCurrent }}</span>
            </nav>

            <h1 class="page-hero__title">
              {{ frontmatter.title }}
            </h1>

            <div class="page-hero__dash" aria-hidden="true" />

            <div
              v-if="frontmatter.date"
              class="page-hero__meta text-subtitle-1 text-medium-emphasis d-flex ga-4 align-center flex-wrap"
            >
              Last Updated: {{ formattedPostDate }}
              <LikeButton />
            </div>
          </div>
        </div>
      </section>

      <div class="blog-post-body page-main">
        <v-row class="blog-layout">
          <v-col cols="12" lg="9" class="content">
            <v-container class="pa-0 pt-1">
              <component class="markdown-content" :is="postContent" />
            </v-container>
          </v-col>

          <v-col cols="0" lg="3" class="d-none d-lg-block toc-container">
            <Contents :headings="headings" />
          </v-col>
        </v-row>

        <div class="blog-post-back">
          <v-icon class="blog-post-back__icon" size="small">mdi-arrow-left</v-icon>
          <RouterLink class="blog-post-back__link" :to="backLink.to">
            {{ backLink.label }}
          </RouterLink>
        </div>
      </div>
    </template>

    <BackToTopButton />
  </div>
</template>

<script setup>
import { ref, watch, markRaw, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Contents from '@/components/Contents.vue';
import headingsData from '@/data/headings.json';
import topics from '@/data/topics.json';
import BackToTopButton from '@/components/BackToTopButton.vue';
import LikeButton from '@/components/LikeButton.vue';
import { formatPostDate } from '@/utils/formatPostDate';
import { getThemeSegmentForTopic } from '@/utils/postPaths';

const route = useRoute();
const router = useRouter();
const postContent = ref(null);
const frontmatter = ref(null);
const headings = ref([]);
const loading = ref(true);

const breadcrumbCurrent = computed(() => {
  const t = frontmatter.value?.title;
  if (t) return t;
  const slug = route.params.slug;
  if (!slug) return '';
  return String(slug)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
});

const formattedPostDate = computed(() =>
  frontmatter.value?.date ? formatPostDate(frontmatter.value.date) : '',
);

const themeNav = computed(() => {
  const topicName = frontmatter.value?.topic;
  if (!topicName) return null;
  const entry = topics.find((t) => t.name === topicName);
  const routePath = entry?.theme?.route;
  const label = entry?.theme?.label;
  if (!routePath || !label) return null;
  return { route: routePath, label };
});

const backLink = computed(() => {
  if (themeNav.value) {
    return {
      to: themeNav.value.route,
      label: `Back to ${themeNav.value.label}`,
    };
  }
  return { to: '/timeline', label: 'Back to Timeline' };
});

const loadMarkdown = async (slug) => {
  try {
    if (!slug) return;

    loading.value = true;

    const markdownFiles = import.meta.glob('/src/posts/*.md');
    const filePath = `/src/posts/${slug}.md`;

    if (markdownFiles[filePath]) {
      const module = await markdownFiles[filePath]();
      postContent.value = markRaw(module.default);
      frontmatter.value = module.frontmatter || {};
      headings.value = headingsData[`${slug}.md`] || [];
    } else {
      postContent.value = null;
      frontmatter.value = null;
    }
  } catch (error) {
    console.error('Error loading markdown file:', error);
    postContent.value = null;
    frontmatter.value = null;
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) loadMarkdown(newSlug);
  },
  { immediate: true }
);

watch(
  () => [frontmatter.value, route.params.theme, route.params.slug],
  () => {
    if (!frontmatter.value?.title || !route.params.slug) return;
    const topic = frontmatter.value.topic ?? 'Miscellaneous';
    const expected = getThemeSegmentForTopic(topic);
    if (route.params.theme && route.params.theme !== expected) {
      router.replace({
        name: 'BlogPost',
        params: { theme: expected, slug: route.params.slug },
      });
    }
  }
);

</script>

<style>
.blog-layout {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.content {
  flex: 1;
}

.toc-container {
  width: 250px;
  position: sticky;
  top: 80px;
  align-self: flex-start;
}

.markdown-content ol,
.markdown-content ul {
  padding-left: 2.5rem;
  margin-bottom: 1.1rem;
}

.markdown-content li {
  list-style-position: outside;
}

.markdown-content p {
  margin-bottom: 1.1rem;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  scroll-margin-top: 80px;
  font-family: 'Roboto', sans-serif;
}

.markdown-content h1 {
  font-size: 1.8em;
  font-weight: 500;
}

.markdown-content h2 {
  font-size: 1.5em;
  font-weight: 500;
}

.markdown-content h3 {
  font-size: 1.25em;
  font-weight: 500;
}

.markdown-content a {
  word-break: break-word;
  overflow-wrap: anywhere;
}

.markdown-content code {
  background: #f5f2f0;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-x: auto;
}

pre {
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

thead {
  background-color: #6b7c64;
  color: white;
}

table td {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

.blog-post-back {
  margin-top: var(--page-space-lg, 2rem);
  padding-top: var(--page-space-md, 1.5rem);
}

.blog-post-back__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  box-shadow: none;
  font: inherit;
  color: rgba(40, 41, 35, 0.75);
  text-decoration: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.blog-post-back__link:hover {
  text-decoration: underline;
}

.blog-post-back__icon {
  opacity: 0.85;
}
</style>
