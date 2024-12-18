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
    };
  },
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