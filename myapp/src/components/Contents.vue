<template>
  <div class="toc">
    <v-list 
      variant="tonal"
      density="compact"
      class="bg-background"
      :style="{ margin: '0' }">
      <v-list-item rounded="sm" :style="{ marginBottom: '0' }">
        Table of Contents
      </v-list-item>
    </v-list>
    
    <div class="toc-list-container">
      <v-list density="compact" class="bg-background">
        <v-list-item
          v-for="heading in headings"
          :key="heading.text"
          link
          rounded="lg"
          @click="scrollToHeading(heading.text)"
          :style="{ height: `30px`, minHeight: '25px', paddingY: '0px', paddingLeft: `${6 + (parseInt(heading.level.replace('h', '')) - 1) * 12}px` }"
        >
          <v-list-item-title :style="{lineHeight: '1.2'}" class="toc-list-item">
            {{ heading.text }}
          </v-list-item-title>
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
  const id = text
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9\-_]+/g, '') // Remove invalid characters
    .normalize('NFKD') // Normalize Unicode to handle accents
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
  const targetElement = document.getElementById(id);

  if (targetElement) {
    // Smooth scroll to element
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
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
  background-color: #5c5c5c; /* Light gray divider line */
  border-radius: 2px; 
}
.toc-title {
  font-size: 0.9rem; /* Adjust size for the title */
}
.toc-list-item {
  font-size: 0.8rem; /* Adjust size for list items */
}
</style>
