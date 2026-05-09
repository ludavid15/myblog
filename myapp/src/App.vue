<template>
    <v-app 
      class="d-flex flex-column" 
      style="min-height: 100vh; background-color: #F7F0E8;">

      <!-- Sidebar (NavDrawer) -->
      <NavDrawer/>

      <SearchOverlay />

      <!-- Main Content -->
      <v-main class="app-main">
        <router-view />
        <Footer />
      </v-main>

    </v-app>
</template>

<script>
import NavDrawer from './components/NavDrawer.vue';
import Footer from './components/Footer.vue';
import SearchOverlay from './components/SearchOverlay.vue';

export default {
  name: 'App',
  components: {
    NavDrawer,
    Footer,
    SearchOverlay,
  },
};
</script>
