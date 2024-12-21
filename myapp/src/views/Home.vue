<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" >
        <h1 class="text-h3 font-weight-light mb-8">Welcome to my Website!</h1>
        <p class="text-h6 mb-4">
          This is my blog where I write about things I've learned. It serves as a sort of record 
          of things I've done as time inevitably erodes my memory. It's also a handy reference in
          case I need to go back and review something. Maybe some of it will be useful for you!
        </p>
        <p class="text-h6 mb-8">
          This is a static website built from scratch using Vue and hosted on AWS in an S3 bucket. 
          Development and deployment are managed locally using a Docker container. I use Route53 
          and CloudFront to serve this website to the internet. 
        </p>
        
        <h2>Recent Articles</h2>
        <v-divider :thickness="5" class="mb-4"></v-divider>
      </v-col>
    </v-row> 
        
    <v-row justify="center">
      <v-col cols="10">
        <v-row>
          <v-col v-for="post in posts" :key="post.slug" cols="12" sm="4">
            <v-card 
              class="d-flex flex-column fill-height" 
              >
              <v-card-title>{{ post.title }}</v-card-title>
              <v-card-subtitle>{{ new Date(post.date).toLocaleDateString() }}</v-card-subtitle>
              <v-card-text class="flex-grow-1">
                {{ post.preview }}
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn :to="`/posts/${post.slug}`" color="primary">Read More</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Reactive variable to store posts
const posts = ref([]);

// Function to load and sort blog posts
const loadPosts = async () => {
  const modules = import.meta.glob('/src/posts/*.md', { eager: true });

  const loadedPosts = Object.keys(modules)
    .map((key) => {
      const content = modules[key];
      const fullPreview = content.frontmatter?.preview || 'No preview available.';
      const trimmedPreview = fullPreview.length > 100 
        ? fullPreview.substring(0, 100) + '...' 
        : fullPreview; // Trim preview to 100 characters

      return {
        title: content.frontmatter?.title || 'Untitled',
        date: content.frontmatter?.date || '1970-01-01',
        preview: trimmedPreview,
        slug: key.replace(/^\/src\/posts\//, '').replace(/\.md$/, ''),
      };
    })
    .filter((post) => post.date) // Ensure posts with valid dates
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

  posts.value = loadedPosts.slice(0, 3); // Get the 3 most recent posts
};


// Load posts on component mount
onMounted(() => {
  loadPosts();
});
</script>