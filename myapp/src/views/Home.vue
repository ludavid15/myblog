<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" >
        <h1 class="text-h3 font-weight-light my-8">Welcome to my Website!</h1>
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
        <v-row v-for="post in posts" :key="post.slug" >
          <v-col>
            <v-card 
              class="d-flex flex-column fill-height"
              variant="tonal"
              hover
              :to="`/posts/${post.slug}`"
              >
              <v-card-title>{{ post.title }}</v-card-title>
              <v-card-subtitle>{{ new Date(post.date).toLocaleDateString() }}</v-card-subtitle>
              <v-card-text class="flex-grow-1">
                {{ post.preview }}
              </v-card-text>
              <v-spacer></v-spacer>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import blogFrontmatter from '@/data/blog-frontmatter.json';


// Computed property to get and sort the recent blog posts
const posts = computed(() => {
  return blogFrontmatter
    .filter((post) => post.date) // Ensure posts have valid dates
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
    .slice(0, 3); // Get the 3 most recent posts
});

</script>