<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="mdAndUp"
    :temporary="!mdAndUp"
    floating
    :width="300"
    class="nav-drawer-surface"
  >
    <template #prepend>
      <div class="brand">
        <span class="brand-title">DAVID LU</span>
      </div>
      <v-divider class="mx-4 mb-2" />
    </template>

    <v-list nav density="comfortable" class="px-2 nav-drawer-list">
      <v-list-item
        :to="{ name: 'Home' }"
        prepend-icon="mdi-home-outline"
        title="HOME"
      />
      <v-list-item
        :to="{ name: 'About' }"
        prepend-icon="mdi-account-outline"
        title="ABOUT"
      />
      <v-list-item
        :to="{ name: 'Timeline' }"
        prepend-icon="mdi-timeline-text-outline"
        title="ALL POSTS"
      />
      <v-list-item
        :to="{ name: 'ThemeSpaceSystems' }"
        prepend-icon="mdi-satellite-variant"
        title="SPACE"
      />
      <v-list-item
        :to="{ name: 'ThemeEngineering' }"
        prepend-icon="mdi-hammer-wrench"
        title="ENGINEERING"
      />
      <v-list-item
        :to="{ name: 'ThemeSoftwareAi' }"
        prepend-icon="mdi-xml"
        title="SOFTWARE"
      />
      <v-list-item
        :to="{ name: 'ThemeLifeAndLearning' }"
        prepend-icon="mdi-lightbulb-outline"
        title="LEARNING"
      />
      <v-list-item
        prepend-icon="mdi-magnify"
        title="SEARCH"
        @click="openSearchOverlay()"
      />
    </v-list>

    <template #append>
      <v-divider class="mx-4 mb-2" />
      <div class="d-flex ga-2 pb-2 mx-4">
        <v-btn
          icon
          variant="text"
          href="https://www.linkedin.com/in/REPLACE_ME"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <v-icon size="28">mdi-linkedin</v-icon>
        </v-btn>
        <v-btn
          icon
          variant="text"
          href="https://github.com/REPLACE_ME"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <v-icon size="28">mdi-github</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-btn
    v-if="!mdAndUp && !drawer"
    icon="mdi-menu"
    size="small"
    elevation="3"
    class="mobile-nav-toggle"
    @click="drawer = true"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import { openSearchOverlay } from '@/search/searchOverlayStore';

const { mdAndUp } = useDisplay();

const drawer = ref(true);
</script>

<style scoped>
.nav-drawer-surface {
  position: relative;
  overflow: hidden;
  background-color: transparent !important;
  border-right: 1px solid rgba(40, 41, 35, 0.12);
}

.nav-drawer-surface::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("/bamboo.PNG");
  background-size: cover;
  background-position: 30% center;
  filter: blur(4px) brightness(1.08) saturate(1.03);
  transform: scale(1.08);
  opacity: 0.75;
  z-index: 0;
  pointer-events: none;
}

.nav-drawer-surface::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(252, 249, 245, 0.65);
  z-index: 1;
  pointer-events: none;
}

.nav-drawer-surface :deep(.v-navigation-drawer__content) {
  position: relative;
  z-index: 2;
  background-color: transparent !important;
}

.nav-drawer-surface :deep(.nav-drawer-list),
.nav-drawer-surface :deep(.nav-drawer-list .v-list) {
  background-color: transparent !important;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 25px 25px 25px;
  position: relative;
  z-index: 2;
}

.brand-title {
  flex: 1;
  min-width: 0;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.375rem;
  font-weight: 600;
  color: #1a1b18;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  line-height: 1.25;
  text-shadow:
    0 1px 0 rgba(249, 246, 241, 0.85),
    0 0 10px rgba(249, 246, 241, 0.55);
}

.nav-drawer-surface :deep(.nav-drawer-list .v-list-item) {
  min-height: 48px;
  border-radius: 8px;
}

.nav-drawer-surface :deep(.nav-drawer-list .v-list-item-title) {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.0625rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  line-height: 1.3;
}

.nav-drawer-surface :deep(.nav-drawer-list .v-list-item__prepend .v-icon) {
  opacity: 0.88;
}

.nav-drawer-surface :deep(.nav-drawer-list .v-list-item--active .v-list-item-title) {
  font-weight: 600;
  color: #0d0d0d;
}

.nav-drawer-surface :deep(.nav-drawer-list .v-list-item--active .v-icon) {
  color: #0d0d0d;
  opacity: 1;
}

.mobile-nav-toggle {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 1006;
}
</style>
