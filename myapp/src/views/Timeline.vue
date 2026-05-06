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
            Timeline
          </h1>

          <div class="page-hero__dash" aria-hidden="true" />

          <p class="page-hero__desc">
            Every post I've written to date.
          </p>
        </div>
      </div>
    </section>

    <section class="timeline-main page-main" aria-label="All posts">
      <v-divider :thickness="3" class="mb-5" />

      <v-chip
        v-for="topic in topics"
        :key="topic.name"
        :color="topic.color"
        :variant="getChipVariant(topic.name)"
        class="mr-2 mb-2"
        @click="filterTopic(topic.name)"
        :prepend-icon="getChipIcon(topic.name)"
      >
        {{ topic.name }}
      </v-chip>

      <v-chip
        class="mr-2 mb-2"
        :variant="getToggleVariant()"
        @click="toggleAllTopics()"
      >
        Toggle All
      </v-chip>

      <v-divider :thickness="3" class="my-3" />

      <v-timeline
        align="start"
        direction="vertical"
        side="end"
      >
        <v-timeline-item
          v-for="(post, index) in formattedPosts"
          :key="post.slug"
          :dot-color="getTopicColor(post.topic)"
          :icon="getTopicIcon(post.topic)"
          fill-dot
        >
          <v-card variant="text">
            <v-card-title class="pt-0 font-weight-semibold">{{ post.title }}</v-card-title>
            <v-card-subtitle>{{ post.formattedDate }}</v-card-subtitle>
            <v-card-text>
              {{ post.preview }}
            </v-card-text>
            <v-card-actions>
              <v-btn :to="`/posts/${post.slug}`" text>Read More</v-btn>
            </v-card-actions>
          </v-card>
          <v-divider
            v-if="index !== formattedPosts.length - 1"
            :thickness="2"
            class="timeline-divider"
          />
        </v-timeline-item>
      </v-timeline>
    </section>

    <BackToTopButton />
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import blogFrontmatter from '@/data/blog-frontmatter.json';
import topics from '@/data/topics.json';
import BackToTopButton from '@/components/BackToTop.vue';

// Create an object which tells us which Topics have been selected
const selectedTopics = reactive({});
topics.forEach(topic => {
  selectedTopics[topic.name] = { selected: true };
});

// Click handler function for topic filtering
function filterTopic(topic) {
  if (selectedTopics[topic]) {
    selectedTopics[topic].selected = !selectedTopics[topic].selected;
  }
}

// Click handler function to toggle all topics
let boolAllTopics = ref(true);
function toggleAllTopics() {
  if (boolAllTopics.value) {
    for (const topicName in selectedTopics) {
      selectedTopics[topicName].selected = false;
    }
    boolAllTopics.value = false
  } else {
    for (const topicName in selectedTopics) {
      selectedTopics[topicName].selected = true;
    }
    boolAllTopics.value = true
  }
}

const getToggleVariant = () => {
  return boolAllTopics.value? 'outlined' : 'flat';
}

// Function to determine the prepend icon
const getChipIcon = (name) => {
  return selectedTopics[name]?.selected ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'; // Return icon conditionally
};

const getChipVariant = (name) => {
  return selectedTopics[name]?.selected ? 'flat' : 'tonal';
}

// Function to get the color based on the topic
function getTopicColor(topic) {
  const topicInfo = topics.find(t => t.name === topic)
  return topicInfo ? topicInfo.color || 'primary' : 'grey'
}

// Function to get the color based on the topic
function getTopicIcon(topic) {
  const topicInfo = topics.find(t => t.name === topic)
  return topicInfo.icon
}

// Utility function to format dates
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString(undefined, options);
  return formattedDate.replace(/, (\d{4})$/, ' $1');
}

// Computed property to get and sort the recent blog posts
const formattedPosts = computed(() => {
  return blogFrontmatter
    .filter((post) => post.date && selectedTopics[post.topic]?.selected) // Ensure posts have valid dates
    .map((post) => ({
      ...post,
      formattedDate: formatDate(post.date),
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
});

</script>

<style scoped>
.timeline-date {
  width: 140px; /* Set a fixed width */
  text-align: right; /* Align dates to the right */
}

@media (max-width: 720px) {
  .timeline-date {
    width: 80px; /* Narrower width for smaller screens */
  }
}

.timeline-divider {
  margin: 16px 0 8px 0;
  max-width: 90%;
}

.timeline-card .v-card-title {
  padding-top: 0;
}

.timeline-card .v-card-text {
  padding-top: 4px;
}
</style>
