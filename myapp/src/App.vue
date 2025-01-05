<template>
    <v-app 
      class="d-flex flex-column" 
      style="min-height: 100vh; background-color: #EEE8D0;">

      <!-- Sidebar (NavDrawer) -->
      <NavDrawer/>

      <!-- Main Content -->
      <v-main class="d-flex justify-center">
        <v-container>
          <router-view />
        </v-container>
      </v-main>
      
    </v-app>
</template>

<script>
import NavDrawer from './components/NavDrawer.vue';

export default {
  name: 'App',
  components: {
    NavDrawer
  },
};
</script>

<style>
</style>
