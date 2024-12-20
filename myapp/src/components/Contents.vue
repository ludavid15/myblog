<template>
  <div class="toc">
    <div class="text-h6">Table of Contents</div>
    
    <div class="toc-list-container">
      <v-list 
        density="compact"
        class="bg-background">
        <v-list-item
          v-for="heading in headings"
          :key="heading.text"
          link
          @click="scrollToHeading(heading.text)"
        >
          <v-list-item-title class="text-caption-grey-darken-3">{{ heading.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>

  </div>
</template>

<script setup>
defineProps({
  headings: Array,
});

// Function to scroll smoothly to the heading
const scrollToHeading = (text) => {
  const id = text.toLowerCase().replace(/\s+/g, '-'); // Generate the ID
  const targetElement = document.getElementById(id);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start', // Align to the top
    });
  }
};
</script>

<style scoped>
.toc {
  width: 100%;
  position: sticky;
  top: 80px; /* Sticky positioning to remain visible when scrolling */
  align-self: flex-start;
  padding: 0; /* Remove any padding */
}
.toc-list-container {
  position: relative;
  padding-left: 15px; /* Add space to the left of the list */
}
.toc-list-container::before {
  content: "";
  position: absolute;
  top: 15px;
  bottom: 15px;
  left: 0;
  width: 4px;
  background-color: #3a3a3a; /* Light gray divider line */
  border-radius: 2px; 
}
.dense-list-item {
  min-height: 35px !important; /* Reduce item height */
  padding: 2px 0 !important; /* Tighten padding vertically */
  line-height: 1.2; /* Adjust line height */
}
.toc-link {
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;
}
.toc-link:hover {
  text-decoration: underline;
  color: #1976d2; /* Highlight color on hover */
}
</style>
