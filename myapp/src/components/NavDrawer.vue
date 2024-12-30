<template>
  <v-navigation-drawer 
  app 
  v-model="drawer" 
  permanent
  floating
  :location="$vuetify.display.mobile ? 'bottom' : 'left'"
  class="bg-secondary d-flex flex-column"
  :width="$vuetify.display.mobile ? undefined : 350">

    <v-list v-model:opened="openedTopics" density="compact">

      <!-- PermaLinks -->
      <v-list-item
      prepend-icon="mdi-home"
      :to="{ name: 'Home'}"
      @click="handleNavClick">
        Home
      </v-list-item>
      <v-list-item 
      prepend-icon="mdi-account"
      :to="{ name: 'About'}"
      @click="handleNavClick">
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
          @click="handleNavClick"
        >
          <v-list-item-title 
            class="text-body-2"
            style="padding-left: 10px;">
            {{ post.title }}
          </v-list-item-title>
        </v-list-item>

        <!-- Show 'No posts' if topic has no content -->
        <v-list-item v-if="data.posts.length === 0" disabled>
            <v-list-item-title style="padding-left: 10px;">No posts available</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>



    <!-- Note at the Bottom -->
    <div class="version-note pa-4 text-left" :style="{ backgroundColor: 'transparent' }">
      <v-chip variant="elevated" elevation='7' :style="{ backgroundColor: '#bdbc9f', color:'black'}">
        Website Version 1.02
      </v-chip>
    </div>

  </v-navigation-drawer>

  <v-app-bar flat app :style="{ background: '#bdbc9f' }">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <a href="/" style="text-decoration: none; display: flex; align-items: center; min-width: 120px;">
      <v-img 
        src="/open-book.png" 
        alt="App logo" 
        max-width="30" 
        max-height="30" 
        style="margin-left: 12px;" 
      ></v-img>
      <v-app-bar-title class="custom-title">Notes</v-app-bar-title>
    </a>
  </v-app-bar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDisplay } from 'vuetify';
import topicsData from "@/data/topics.json";
import blogFrontmatter from "@/data/blog-frontmatter.json"

const posts = ref(blogFrontmatter); // Load directly from JSON
const drawer = ref(null);
const openedTopics = ref([]);

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

// Use Vuetify's useDisplay composable to detect screen size
const { smAndDown } = useDisplay();

// Function to handle navigation link clicks
const handleNavClick = () => {
  if (smAndDown.value) {
    drawer.value = false; // Close the drawer on small screens
  }
};

</script>


<style>
.custom-title {
  font-family: 'Poppins', serif; /* Replace with your desired font */
  color: #282923; /* Optional: customize color */
  padding-left: 12px;
}
.group-expanded  {
  color: rgb(201, 178, 76);
}
.group-expanded .v-list-item-title {
  font-weight: bold !important;
} 
.version-note {
  position: absolute;
  bottom: 0;
}
</style>