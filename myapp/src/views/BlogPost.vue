<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">

        <div v-if="frontmatter && frontmatter.title">
          <v-breadcrumbs :items="['home', 'blogs', route.params.slug]"></v-breadcrumbs>
          <div div class="text-h3 px-1"> 
            {{ frontmatter.title }}
          </div>
          <v-divider :thickness="5" class="ma-1"></v-divider>
          <div v-if="frontmatter.date" 
            class="text-subtitle-1 text-medium-emphasis px-1 my-2">
            Last Updated: {{ frontmatter.date }}
          </div>
        </div>
        
        <v-container class="pa-1">
          <component class="markdown-content" :is="postContent" />
        </v-container>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Refs and route
const route = useRoute();
const postContent = ref(null);
const frontmatter = ref(null);

// Dynamically import markdown files
const loadMarkdown = async (slug) => {
  try {
    if (!slug) return; // Guard clause in case slug is undefined

    // Use import.meta.glob to dynamically load markdown files
    const markdownFiles = import.meta.glob('/src/posts/*.md');
    const filePath = `/src/posts/${slug}.md`;

    if (markdownFiles[filePath]) {
      const module = await markdownFiles[filePath]();
      postContent.value = module.default;
      frontmatter.value = module.frontmatter || {}
      console.log('Extracted Frontmatter:', frontmatter.value);
    } else {
      postContent.value = null;
      frontmatter.value = null;
    }
  } catch (error) {
    console.error('Error loading markdown file:', error);
    postContent.value = null;
    frontmatter.value = null;
  }
};

// Watch for route changes
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) loadMarkdown(newSlug);
  },
  { immediate: true } // Trigger immediately on component mount
);

// On component mount
onMounted(() => {
  if (route.params.slug) loadMarkdown(route.params.slug);
});
</script>

<style>
.markdown-content ol,
.markdown-content ul {
    padding-left: 1.5rem;
    margin-bottom: 1.1rem;
}
.markdown-content li {
    list-style-position: inside;
}
.markdown-content p {
    margin-bottom: 1.1rem;
}
</style>


