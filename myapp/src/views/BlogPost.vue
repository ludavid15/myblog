<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xl="10">

        <div v-if="frontmatter && frontmatter.title">
          <v-breadcrumbs :items="['home', 'posts', route.params.slug]"></v-breadcrumbs>
          <div div class="text-h3 px-1"> 
            {{ frontmatter.title }}
          </div>
          <v-divider :thickness="5" class="ma-1"></v-divider>
          <div v-if="frontmatter.date" 
            class="text-subtitle-1 text-medium-emphasis px-1 my-2">
            Last Updated: {{ frontmatter.date }}
          </div>
        </div>

        <v-row class="blog-layout">
          <!-- Primary Content -->
          <v-col cols="12" md="8" lg="9" class="content">
            <div ref="content" class="markdown-content">
              <v-container class="pa-1">
                <component class="markdown-content" :is="postContent" />
              </v-container>
            </div>
          </v-col>

          <!-- Table of Contents -->
          <v-col cols="12" md="4" lg="3" class="d-none d-md-block toc-container">
            <Contents :headings="headings" />
          </v-col>
        </v-row>

        <BackToTopButton />
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import Contents from '@/components/Contents.vue';
import headingsData from '@/data/headings.json';
import BackToTopButton from '@/components/BackToTop.vue';

// Refs and route
const route = useRoute();
const postContent = ref(null);
const frontmatter = ref(null);
const headings = ref([]);

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
      headings.value = headingsData[`${slug}.md`] || [];
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
.blog-layout {
  display: flex;
  flex-direction: row;
  gap: 20px; /* Space between content and ToC */
}

.content {
  flex: 1; /* Content takes up available space */
}

.toc-container {
  width: 250px; /* Fixed width for the ToC */
  position: sticky;
  top: 80px; /* Sticky ToC position */
  align-self: flex-start;
}

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
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  scroll-margin-top: 80px; /* Adjust this value to match the app-bar height */
}
</style>


