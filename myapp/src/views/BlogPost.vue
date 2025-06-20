<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xl="10">

        <!-- Show Loading Screen -->
        <v-row v-if="loading" class="d-flex justify-center align-center" style="height: 300px;">
          <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
        </v-row>

        <!-- Show Content When Loaded -->
        <v-row v-else>
          <v-col cols="12">

            <!-- Frontmatter Section -->
            <div v-if="frontmatter && frontmatter.title" class="mb-5">
              <v-breadcrumbs :items="['home', 'posts', route.params.slug]"></v-breadcrumbs>
              <div div class="text-h3"> 
                {{ frontmatter.title }}
              </div>
              <v-divider :thickness="5"></v-divider>
              <div v-if="frontmatter.date" 
                class="text-subtitle-1 text-medium-emphasis my-2 d-flex ga-4 align-center">
                Last Updated: {{ frontmatter.date }}
                <LikeButton />
              </div>
            </div>

            <!-- Primary Content -->
            <v-row class="blog-layout">
              <v-col cols="12" lg="9" class="content">
                <v-container class="pa-0 pt-1">
                  <component class="markdown-content" :is="postContent" />
                </v-container>
              </v-col>

              <!-- Table of Contents -->
              <v-col cols="0" lg="3" class="d-none d-lg-block toc-container">
                <Contents :headings="headings" />
              </v-col>
            </v-row>

          </v-col>
        </v-row>

        <!-- Scroll back to Top Button -->
        <BackToTopButton />
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted, markRaw } from 'vue';
import { useRoute } from 'vue-router';
import Contents from '@/components/Contents.vue';
import headingsData from '@/data/headings.json';
import BackToTopButton from '@/components/BackToTop.vue';
import LikeButton from '@/components/LikeButton.vue';

// Refs and route
const route = useRoute();
const postContent = ref(null);
const frontmatter = ref(null);
const headings = ref([]);
const loading = ref(true);

// Dynamically import markdown files
const loadMarkdown = async (slug) => {
  try {
    if (!slug) return; // Guard clause in case slug is undefined

    loading.value = true;

    // Use import.meta.glob to dynamically load markdown files
    const markdownFiles = import.meta.glob('/src/posts/*.md');
    const filePath = `/src/posts/${slug}.md`;

    if (markdownFiles[filePath]) {
      const module = await markdownFiles[filePath]();
      postContent.value = markRaw(module.default);
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
  } finally {
    loading.value = false;
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

/* Styling for Markdown Text */
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
  scroll-margin-top: 80px; /* Adjust to match the app-bar height */
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

/* Styling for Inline Code Blocks */
.markdown-content code {
    background: #f5f2f0; /* Match your Prism theme background */
    padding: 0.2em 0.4em;
    border-radius: 4px;
    white-space: pre-wrap;
    word-break: break-word;
    overflow-x: auto;
}

/* Styling for Code Blocks */
pre {     
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

/* Styling for Tables */
thead {
  background-color: #6b7c64; /* Change to your desired color */
  color: white; /* Optional: change text color */
}
</style>


