<template>
  <div class="page-shell">
    <section class="page-hero" aria-label="Search results">
      <div class="page-hero__grid">
        <div class="page-hero__copy">
          <nav class="page-breadcrumb" aria-label="Breadcrumb">
            <RouterLink class="page-breadcrumb__link" to="/">Home</RouterLink>
            <span class="page-breadcrumb__sep" aria-hidden="true">/</span>
            <span class="page-breadcrumb__current">Search</span>
          </nav>

          <h1 class="page-hero__title">Search</h1>
          <div class="page-hero__dash" aria-hidden="true" />
          <div class="text-subtitle-1 text-medium-emphasis">
            <template v-if="query">
              Results for <span class="search-query">“{{ query }}”</span> ({{ results.length }})
            </template>
            <template v-else>
              Type a query in the search overlay (Cmd/Ctrl+K).
            </template>
          </div>
        </div>
      </div>
    </section>

    <div class="page-main">
      <v-container class="pa-0">
        <v-alert
          v-if="query && results.length === 0"
          type="info"
          variant="tonal"
          class="mb-4"
        >
          No results found.
        </v-alert>

        <v-list
          v-if="results.length"
          class="search-results"
          lines="three"
          bg-color="transparent"
        >
          <v-list-item
            v-for="r in results"
            :key="r.slug"
            :to="{ name: 'BlogPost', params: { slug: r.slug } }"
            class="search-result"
          >
            <v-list-item-title class="search-result__title">
              {{ r.title }}
            </v-list-item-title>
            <v-list-item-subtitle class="search-result__meta">
              <span v-if="r.topic">{{ r.topic }}</span>
              <span v-if="r.topic && r.date" class="mx-2" aria-hidden="true">·</span>
              <span v-if="r.date">{{ r.date }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="search-result__snippet">
              <span v-html="r.snippetHtml" />
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { searchPosts } from "@/search/searchIndex";

const route = useRoute();

const query = computed(() => {
  const q = route.query.q;
  return typeof q === "string" ? q.trim() : "";
});

const results = computed(() => {
  if (!query.value) return [];
  return searchPosts(query.value, 30);
});
</script>

<style scoped>
.search-query {
  font-weight: 600;
}

.search-results {
  /* Match app background without hard-coding a hex */
  background: transparent !important;
  padding: 0 !important;
}

.search-results :deep(mark) {
  background: rgba(255, 215, 0, 0.45);
  padding: 0 0.15em;
  border-radius: 4px;
}

.search-result {
  border-bottom: 1px solid rgba(40, 41, 35, 0.12);
  border-radius: 0;
  margin: 0;
  padding: 0.95rem 0;
  transition: background-color 0.15s ease;
  background: transparent;
}

.search-result:first-child {
  border-top: 1px solid rgba(40, 41, 35, 0.12);
}

.search-result:hover {
  background-color: rgba(40, 41, 35, 0.04);
}

.search-result__title {
  font-weight: 600;
  font-family: "Source Serif 4", Georgia, serif;
  font-size: 1.05rem;
  line-height: 1.25;
}

.search-result__meta {
  opacity: 0.75;
  margin-top: 0.25rem;
  font-size: 0.9rem;
}

.search-result__snippet {
  opacity: 0.92;
  margin-top: 0.55rem;
  font-family: "Source Serif 4", Georgia, serif;
  line-height: 1.55;
}
</style>

