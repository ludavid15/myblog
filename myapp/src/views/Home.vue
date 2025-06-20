<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" >
        <h1 class="text-h3 font-weight-light my-8">Welcome to my Website!</h1>
        <p class="text-h6 mb-4">
          This is my blog where I write about things I've learned. Back in undergrad, I used to
          type up my notes from class and put them into Word documents. At the time, it was
          mostly just a way to study, but by the time I graduated, I realized I had created a pretty 
          solid collection of well-organized, digital notes. So I figured I might as well put 
          them onto the internet. That way I could access them from anywhere. Nowadays, it serves as a 
          sort of record of things I've done as time inevitably erodes my memory. It's also a 
          handy reference in case I need to go back and review something. The content is mostly science 
          and engineering, but there's a few other things on here as well such as music and philosophy.
          There aren't any hard and fast rules, really it's just anything I'm interested in.  
        </p>
        <p class="text-h6 mb-8">
          What you're reading is version two of my website. It replaces the old site that was
          built using a Jekyll theme and hosted on Github. I built this website from scratch 
          using Vue and I'm currently hosting it on AWS in an S3 bucket. I manage development 
          and deployment locally using a Docker container. I use Route53 and 
          CloudFront to serve this website to the internet. 
        </p>
        <p class="text-h6 mb-8">
          And finally, it goes without saying that any ideas expressed on this blog are my own
          and do not reflect the official positions of any organizations I may be a part of. 
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
      <v-col cols="12" md="10" >
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