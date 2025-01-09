<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" >
        <h1 class="text-h3 font-weight-light my-8">Timeline</h1>
        <p class="text-h6">
        A timeline view of all the posts on this website. They are color coded
        by the topic to which they belong.
        </p>
      </v-col>
    </v-row> 

    <v-row justify="center">
      <v-col cols="10">
        <v-divider :thickness="3" class="mb-5"></v-divider>
        <v-chip 
          v-for="topic in topics"
          :color="topic.color"
          variant="flat"
          class="mr-2 mb-2"
        >
          {{ topic.name }}
        </v-chip>
        <v-divider :thickness="3" class="my-3"></v-divider>
      </v-col>
    </v-row>

    
        
    <v-row justify="center">
      <v-col cols="10">

        <v-timeline 
          direction="vertical" side="end">
          <v-timeline-item 
            v-for="post in formattedPosts" :key="post.slug"
            :dot-color="getTopicColor(post.topic)"
            :icon="getTopicIcon(post.topic)"
            fill-dot
          >
            <template v-slot:opposite>
              <div class="font-weight-medium">{{ post.formattedDate }}</div>
            </template>
            <v-card               
              variant="tonal"
              hover
              :to="`/posts/${post.slug}`">
                <v-card-title>{{ post.title }}</v-card-title>
                <v-card-text class="flex-grow-1">
                  {{ post.preview }}
                </v-card-text>
            </v-card>

          </v-timeline-item>
        </v-timeline>

      </v-col>
    </v-row>


  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import blogFrontmatter from '@/data/blog-frontmatter.json';
import topics from '@/data/topics.json';

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
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

// Computed property to get and sort the recent blog posts
const formattedPosts  = computed(() => {
  return blogFrontmatter
    .filter((post) => post.date) // Ensure posts have valid dates
    .map((post) => ({
      ...post,
      formattedDate: formatDate(post.date),
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
});

</script>