<template>
    <v-app 
      class="d-flex flex-column" 
      style="min-height: 100vh; background-color: #EEE8D0;">

      <!-- Sidebar (NavDrawer) -->
      <NavDrawer class="shrink-0"/>

      <!-- Main Content -->
      <v-main class="d-flex justify-center">
        <v-container>
          <router-view />
        </v-container>
      </v-main>

      <!--
      <v-footer 
        app 
        class="d-flex justify-center align-center indigo"
        style="background-color: beige;">
        <span>&copy; 2024 Ludav-Notes Hosted on AWS</span>
      </v-footer>
      -->
      
    </v-app>
</template>

<script>
import NavDrawer from './components/NavDrawer.vue';

export default {
  name: 'App',
  data() {
    return {
      message: 'Hello, Vue!',
    };
  },
  components: {
    NavDrawer
  },
  methods: {
    updateMessage() {
      this.message = 'You clicked the button!';
    }
  }
};
</script>

<style>
</style>
