<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="10" >
        <h1 class="text-h3 font-weight-light mt-8 mb-3">Field Notes</h1>
        
        <p class="text-h6 font-italic mb-8">
          Lessons learned on science, engineering, and life.
        </p>
        
        <p class="text-h6 mb-8">
          Hi! Welcome to my blog. This started back in undergrad, from a collection of lecture notes I would type up into Word documents. At the time, it was just my way to study. Nowadays, I keep this as record of things I've learned as changing priorities and the slow march of time inevitably erode my memory. 
        </p>
        <p class="text-h6 mb-8">
          The website you are on is version two. It replaces the old site that was built using a Jekyll theme and hosted on Github. I built this website from scratch using Vue and I'm currently hosting it on AWS in an S3 bucket. I manage development and deployment locally using a Docker container. I use Route53 and CloudFront to serve this website to the internet. Like buttons were added in a recent change for me to experiment with DynamoDB and Lambda. 
        </p>
        <p class="text-h6 mb-8">
          And finally, it goes without saying that any ideas expressed on this blog are my own and do not reflect the official positions of any organizations I may be a part of. 
        </p>

        <p class="text-h6 mb-8">
          Total article count to date: <b>{{ totalArticles }}</b>
        </p>

        <v-alert
          border="top"
          type="info"
          class="mb-6"
          closable
          color="#3C4A37"
          variant="tonal"
        >
         If you're reading this on Mobile, some features may not render correctly. I'm working on a fix
         but for now I recommend switching over to desktop. 
        </v-alert>

        <h2>Recent Articles</h2>
        <v-divider :thickness="5" class="mb-4"></v-divider>
      </v-col>
    </v-row> 
        
    <v-row justify="center">
      <v-col cols="12" lg="10" >
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

const totalArticles = computed(() => {
  return blogFrontmatter.length;
});

</script>