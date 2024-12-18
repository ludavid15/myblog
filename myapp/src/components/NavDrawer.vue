<template>
  <v-navigation-drawer 
  app 
  v-model="drawer" 
  permanent
  floating
  class="bg-secondary"
  :width="350">

    <v-list density="compact">
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

      <!-- Dynamic Blog Links -->
      <v-list-item
        v-for="(post, index) in posts"
        :key="index"
        :to="`/post/${post.slug}`"
      >
        <v-list-item-title>{{ post.title }}</v-list-item-title>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>

  <v-app-bar flat app class="bg-background">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="custom-title">Notes</v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const posts = ref([]);
const drawer = ref(false);

// Load markdown files and extract frontmatter
const loadPosts = async () => {
  const markdownFiles = import.meta.glob('/src/posts/*.md');

  const postEntries = await Promise.all(
    Object.entries(markdownFiles).map(async ([filePath, loadFile]) => {
      const module = await loadFile(); // Dynamically load the markdown file
      const slug = filePath.split('/').pop().replace('.md', ''); // Extract slug from file name

      // Extract frontmatter (title)
      const title = module.frontmatter?.title || slug; // Fallback to slug if no title is found

      return { slug, title };
    })
  );

  posts.value = postEntries;
};

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