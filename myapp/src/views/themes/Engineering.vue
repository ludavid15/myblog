<template>
  <div class="page-shell">
    <section class="page-hero" aria-label="Engineering overview">
      <div class="page-hero__grid">
        <div class="page-hero__copy">
          <nav class="page-breadcrumb" aria-label="Breadcrumb">
            <RouterLink class="page-breadcrumb__link" to="/">Home</RouterLink>
            <span class="page-breadcrumb__sep" aria-hidden="true">/</span>
            <span class="page-breadcrumb__current">Engineering</span>
          </nav>

          <h1 class="page-hero__title">
            Engineering
          </h1>

          <div class="page-hero__dash" aria-hidden="true" />

          <p class="page-hero__desc">
            This page collects notes across core engineering disciplines: structures, fluids, dynamics, and the
            methods used to design and verify complex systems. Expect material on fundamentals, analysis, and how
            theory meets hardware in real programs.
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
            {{ formatDate(post.date) }}
          </div>
          <RouterLink class="theme-articles__title" :to="`/posts/${post.slug}`">
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
import blogFrontmatter from '@/data/blog-frontmatter.json';
import topics from '@/data/topics.json';

const THEME_ROUTE = '/themes/engineering';

const allowedTopics = new Set(
  topics
    .filter((t) => t.theme?.route === THEME_ROUTE)
    .map((t) => t.name)
);

const posts = computed(() => {
  return blogFrontmatter
    .filter((post) => post.date && allowedTopics.has(post.topic))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
});

function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}
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
