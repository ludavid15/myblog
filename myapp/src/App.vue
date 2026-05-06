<template>
    <v-app 
      class="d-flex flex-column" 
      style="min-height: 100vh; background-color: #FCF8F3;">

      <!-- Sidebar (NavDrawer) -->
      <NavDrawer/>

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

export default {
  name: 'App',
  components: {
    NavDrawer,
    Footer
  },
};
</script>

<style>
</style>
