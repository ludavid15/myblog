<template>
  <div class="page-shell">
    <section class="page-hero" aria-label="Timeline overview">
      <div class="page-hero__grid">
        <div class="page-hero__copy">
          <nav class="page-breadcrumb" aria-label="Breadcrumb">
            <RouterLink class="page-breadcrumb__link" to="/">Home</RouterLink>
            <span class="page-breadcrumb__sep" aria-hidden="true">/</span>
            <span class="page-breadcrumb__current">Timeline</span>
          </nav>

          <h1 class="page-hero__title">
            All Posts
          </h1>

          <div class="page-hero__dash" aria-hidden="true" />

          <p class="page-hero__desc">
            Everything I've written to date.
          </p>
        </div>
      </div>
    </section>

    <section class="timeline-main page-main" aria-label="All posts">
      <div class="timeline-filter-divider timeline-filter-divider--top" aria-hidden="true">
        <span class="timeline-filter-divider__label">Filter by topic</span>
      </div>

      <div class="timeline-filter__chips">
        <button
          v-for="topic in topics"
          :key="topic.name"
          class="topic-chip filter-topic-chip"
          type="button"
          :aria-pressed="selectedTopics.has(topic.name)"
          :style="getTopicChipStyle(topic.name)"
          @click="filterTopic(topic.name)"
        >
          <v-icon :icon="getChipIcon(topic.name)" size="16" />
          <span class="topic-chip__label">
          {{ topic.name }}
          </span>
        </button>
      </div>

      <div class="timeline-filter-divider timeline-filter-divider--bottom">
        <button
          class="timeline-filter-clear"
          type="button"
          :disabled="selectedTopics.size === 0"
          @click="clearSelectedTopics()"
        >
          <v-icon icon="mdi-close-circle-outline" size="16" />
          Clear selected topics
        </button>
      </div>

      <h2 id="theme-articles-heading" class="theme-articles__heading">
        Articles
      </h2>

      <div class="theme-articles__table" role="list">
        <div
          v-for="post in formattedPosts"
          :key="post.slug"
          class="theme-articles__row theme-articles__row--timeline"
          role="listitem"
        >
          <div class="theme-articles__date">
            {{ post.formattedDate }}
          </div>

          <RouterLink class="theme-articles__title" :to="`/posts/${post.slug}`">
            {{ post.title }}
          </RouterLink>

          <div class="theme-articles__topic">
            <span
              class="topic-chip"
              :style="getTopicChipStyle(post.topic)"
              :title="post.topic"
            >
              <v-icon :icon="getTopicIcon(post.topic)" size="16" />
              <span class="topic-chip__label">{{ post.topic }}</span>
            </span>
          </div>
        </div>

        <div v-if="formattedPosts.length === 0" class="theme-articles__empty text-medium-emphasis">
          No posts match these topic filters yet.
        </div>
      </div>
    </section>

    <BackToTopButton />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import blogFrontmatter from '@/data/blog-frontmatter.json';
import topics from '@/data/topics.json';
import BackToTopButton from '@/components/BackToTop.vue';

const topicByName = new Map(topics.map((t) => [t.name, t]));

// Implicit-all filtering:
// - selectedTopics.size === 0 => show all posts
// - otherwise => show only selected topics
const selectedTopics = reactive(new Set());

// Click handler function for topic filtering
function filterTopic(topic) {
  if (selectedTopics.has(topic)) selectedTopics.delete(topic);
  else selectedTopics.add(topic);
}

function clearSelectedTopics() {
  selectedTopics.clear();
}

// Function to determine the prepend icon
const getChipIcon = (name) => {
  return selectedTopics.has(name) ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline';
};

// Function to get the color based on the topic
function getTopicColor(topic) {
  const topicInfo = topicByName.get(topic);
  return topicInfo ? topicInfo.color || 'primary' : 'grey'
}

function getTopicIcon(topic) {
  const topicInfo = topicByName.get(topic);
  return topicInfo?.icon ?? 'mdi-tag';
}

function getTopicChipStyle(topic) {
  const color = getTopicColor(topic);
  return {
    '--topic-color': color,
  };
}

// Utility function to format dates
function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

// Computed property to get and sort the recent blog posts
const formattedPosts = computed(() => {
  return blogFrontmatter
    .filter((post) => post.date && (selectedTopics.size === 0 || selectedTopics.has(post.topic)))
    .map((post) => ({
      ...post,
      formattedDate: formatDate(post.date),
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
});

</script>

<style scoped>
.timeline-filter-divider {
  display: grid;
  align-items: center;
  gap: var(--page-space-sm);
}

.timeline-filter-divider::before,
.timeline-filter-divider::after {
  content: "";
  height: 3px;
  background: rgba(40, 41, 35, 0.18);
}

.timeline-filter-divider--top {
  grid-template-columns: 2.25rem auto 1fr;
  margin-bottom: var(--page-space-sm);
}

.timeline-filter-divider--top::after {
  display: block;
}

.timeline-filter-divider--top::before {
  display: block;
}

.timeline-filter-divider--bottom {
  grid-template-columns: 1fr auto 2.25rem;
  margin: 0.35rem 0 var(--page-space-md);
}

.timeline-filter-divider--bottom::before {
  display: block;
}

.timeline-filter-divider--bottom::after {
  display: block;
}

.timeline-filter-divider__label,
.timeline-filter-clear {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.timeline-filter-divider__label {
  color: rgba(40, 41, 35, 0.76);
}

.timeline-filter__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.25rem 0 0.45rem;
}

.timeline-filter-clear {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid rgba(40, 41, 35, 0.24);
  border-radius: 999px;
  background: rgba(40, 41, 35, 0.04);
  color: rgba(40, 41, 35, 0.76);
  cursor: pointer;
  padding: 0.35rem 0.7rem;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.timeline-filter-clear:disabled {
  border-color: rgba(40, 41, 35, 0.12);
  background: rgba(40, 41, 35, 0.02);
  color: rgba(40, 41, 35, 0.34);
  cursor: default;
}

.timeline-filter-clear:not(:disabled):hover {
  border-color: rgba(40, 41, 35, 0.44);
  background: rgba(40, 41, 35, 0.09);
  color: rgba(40, 41, 35, 0.9);
}

.timeline-filter-clear:not(:disabled):focus-visible {
  outline: 2px solid rgba(40, 41, 35, 0.35);
  outline-offset: 3px;
}

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
  grid-template-columns: 7.5rem minmax(0, 1fr) auto;
  gap: var(--page-space-md);
  align-items: center;
  padding: 0.95rem 0.75rem 0.95rem 0;
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

.theme-articles__topic {
  display: flex;
  justify-content: flex-end;
}

.topic-chip {
  max-width: 16rem;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0 0.6rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--topic-color) 65%, rgba(40, 41, 35, 0.2));
  background: color-mix(in srgb, var(--topic-color) 18%, transparent);
  color: color-mix(in srgb, var(--topic-color) 88%, #282923);
}

.filter-topic-chip {
  border: 1px solid color-mix(in srgb, var(--topic-color) 65%, rgba(40, 41, 35, 0.2));
  cursor: pointer;
  font: inherit;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    transform 0.15s ease;
}

.filter-topic-chip:hover {
  background: color-mix(in srgb, var(--topic-color) 26%, transparent);
  border-color: color-mix(in srgb, var(--topic-color) 78%, rgba(40, 41, 35, 0.2));
}

.filter-topic-chip[aria-pressed="true"] {
  background: color-mix(in srgb, var(--topic-color) 92%, #151612);
  border-color: color-mix(in srgb, var(--topic-color) 92%, #151612);
  color: rgba(255, 255, 255, 0.96);
}

.filter-topic-chip:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--topic-color) 55%, rgba(40, 41, 35, 0.25));
  outline-offset: 3px;
}

.topic-chip__label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.theme-articles__empty {
  padding: var(--page-space-md) 0;
}

@media (max-width: 520px) {
  .theme-articles__row {
    grid-template-columns: 1fr;
    gap: 0.35rem;
    align-items: baseline;
    padding-right: 0;
  }

  .theme-articles__topic {
    justify-content: flex-start;
  }
}
</style>
