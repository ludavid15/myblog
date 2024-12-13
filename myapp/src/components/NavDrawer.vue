<template>
  <v-navigation-drawer 
  app 
  v-model="drawer" 
  permanent
  floating
  class="bg-secondary"
  :width="350">
    <v-list v-model:opened="openedTopics" density="compact">

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

      <!-- Iterate through Topics -->
      <v-list-group
        v-for="topic in topics"
        :key="topic.name"
        :value="topic.name"
        >

        <!-- Group Header -->
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="topic.icon"
            :title="topic.name"
            :class="{ 'group-expanded': openedTopics.includes(topic.name) }"
          ></v-list-item>
        </template>

        <!-- Sub-items (Posts) -->
        <v-list-item
          v-for="post in topic.posts"
          :key="post.title"
          :to="{
                  name: 'blog-post', // Identifies the route by name
                  params: { topic_path: topic.path, post_path: post.path }, // Pass params for dynamic path
                  query: { meta: JSON.stringify(post) } // Pass additional metadata as query
                }"
          >
          <v-list-item-title style="padding-left: 10px;"> {{ post.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar flat app class="bg-background">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="custom-title">Notes</v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      drawer: "true",
      openedTopics: [], // Tracks which topics are expanded
      topics: [],
    };
  },
  async created() {
    try {
      const response = await fetch('/posts_directory.json'); 
      if (!response.ok) {
        throw new Error('Failed to load topics.json');
      }
      this.topics = await response.json();; // Save fetched data to topics
    } catch (error) {
      console.error('Error fetching topics:', error);
    }   
  }
};
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