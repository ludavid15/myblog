<template>
  <v-navigation-drawer 
  app 
  v-model="drawer" 
  permanent
  floating
  class="bg-secondary"
  :width="350">

    <v-list v-model:opened="openedTopics" density="compact">

      <!-- PermaLinks -->
      <v-list-item
      prepend-icon="mdi-home"
      :to="{ name: 'Home'}">
        Home
      </v-list-item>
      <v-list-item 
      prepend-icon="mdi-account"
      :to="{ name: 'About'}">
        About Me
      </v-list-item>

      <!-- Divider -->
      <v-divider class="my-2"></v-divider>
      <v-list-subheader class="text-h6 text-white">Blog Posts</v-list-subheader>
      <v-divider class="my-2"></v-divider>
      
      <!-- Blog Posts -->
      <v-list-group
        v-for="(data, topicName) in groupedPosts"
        :key="topicName"
        :value="topicName"
      >
        <!-- Activator: Topic with Icon -->
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="data.icon"
            :title="topicName"
            :class="{ 'group-expanded': openedTopics.includes(topicName) }"
          ></v-list-item>
        </template>

        <!-- Posts under each topic -->
        <v-list-item
          v-for="(post, index) in data.posts"
          :key="index"
          :to="`/posts/${post.slug}`"
        >
          <v-list-item-title style="padding-left: 10px;">{{ post.title }}</v-list-item-title>
        </v-list-item>

        <!-- Show 'No posts' if topic has no content -->
        <v-list-item v-if="data.posts.length === 0" disabled>
            <v-list-item-title style="padding-left: 10px;">No posts available</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
    
  </v-navigation-drawer>

  <v-app-bar flat app class="bg-background">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="custom-title">Notes</v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import topicsData from "@/data/topics.json";

const posts = ref([]);
const drawer = ref(false);
const openedTopics = ref([]);

// Load posts dynamically
const loadPosts = async () => {
  const modules = import.meta.glob("/src/posts/*.md", { eager: true });
  const loadedPosts = Object.keys(modules).map((key) => {
    const content = modules[key];
    return {
      title: content.frontmatter.title || "Untitled",
      topic: content.frontmatter.topic || "Miscellaneous", // Default topic
      slug: key.replace(/^\/src\/posts\//, "").replace(/\.md$/, ""),
    };
  });
  posts.value = loadedPosts;
};


// Group posts under predefined topics
const groupedPosts = computed(() => {
  const grouped = {};

  // Initialize all topics from the JSON with an empty array
  topicsData.forEach((topic) => {
    grouped[topic.name] = { posts: [], icon: topic.icon, path: topic.path };
  });

  // Place posts under the correct topic
  posts.value.forEach((post) => {
    const topic = topicsData.find((t) => t.name === post.topic);
    if (topic) {
      grouped[topic.name].posts.push(post);
    } else {
      grouped["Miscellaneous"].posts.push(post); // Fallback for unmatched topics
    }
  });

  return grouped;
});

// Fetch posts on mount
onMounted(() => {
  loadPosts();
});

</script>




<style>
.custom-title {
  font-family: 'Poppins', serif; /* Replace with your desired font */
  color: #484b39; /* Optional: customize color */
}
.group-expanded  {
  color: rgb(201, 178, 76);
}
.group-expanded .v-list-item-title {
  font-weight: bold !important;
} 
</style>