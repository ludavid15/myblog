<template>
  <div class="page-shell">
    <section class="page-hero" :aria-label="themePage.heroAriaLabel">
      <div class="page-hero__grid">
        <div class="page-hero__copy">
          <nav class="page-breadcrumb" aria-label="Breadcrumb">
            <RouterLink class="page-breadcrumb__link" to="/">Home</RouterLink>
            <span class="page-breadcrumb__sep" aria-hidden="true">/</span>
            <span class="page-breadcrumb__current">{{ themePage.heading }}</span>
          </nav>

          <h1 class="page-hero__title">
            {{ themePage.heading }}
          </h1>

          <div class="page-hero__dash" aria-hidden="true" />

          <p class="page-hero__desc">
            {{ themePage.description }}
          </p>
        </div>
      </div>
    </section>

    <section class="theme-articles page-main" aria-labelledby="theme-articles-heading">
      <h2 id="theme-articles-heading" class="theme-articles__heading">
        Articles
      </h2>

      <div class="theme-articles__table" role="list">
        <div
          v-for="post in posts"
          :key="post.slug"
          class="theme-articles__row"
          role="listitem"
        >
          <div class="theme-articles__date">
            {{ formatPostDate(post.date) }}
          </div>
          <RouterLink class="theme-articles__title" :to="`${route.path}/${post.slug}`">
            {{ post.title }}
          </RouterLink>
        </div>

        <div v-if="posts.length === 0" class="theme-articles__empty text-medium-emphasis">
          No articles for this theme yet.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import blogFrontmatter from '@/data/blog-frontmatter.json';
import topics from '@/data/topics.json';
import { formatPostDate } from '@/utils/formatPostDate';

const route = useRoute();

const themePage = computed(() => route.meta.themePage);

const allowedTopics = computed(
  () =>
    new Set(
      topics
        .filter((t) => t.theme?.route === route.path)
        .map((t) => t.name),
    ),
);

const posts = computed(() => {
  return blogFrontmatter
    .filter((post) => post.date && allowedTopics.value.has(post.topic))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
});
</script>

<style scoped>
.theme-articles__heading {
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(40, 41, 35, 0.9);
  margin: 0 0 var(--page-space-sm) 0;
}

.theme-articles__table {
  border-top: 1px solid rgba(40, 41, 35, 0.12);
}

.theme-articles__row {
  display: grid;
  grid-template-columns: 7.5rem minmax(0, 1fr);
  gap: var(--page-space-md);
  align-items: baseline;
  padding: 0.95rem 0;
  border-bottom: 1px solid rgba(40, 41, 35, 0.12);
  transition: background-color 0.15s ease;
}

.theme-articles__row:hover {
  background-color: rgba(40, 41, 35, 0.04);
}

.theme-articles__date {
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  color: rgba(40, 41, 35, 0.6);
}

.theme-articles__title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #282923;
  text-decoration: none;
}

.theme-articles__title:hover {
  text-decoration: underline;
}

.theme-articles__empty {
  padding: var(--page-space-md) 0;
}

@media (max-width: 520px) {
  .theme-articles__row {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
</style>
