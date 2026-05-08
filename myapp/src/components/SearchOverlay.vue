<template>
  <v-dialog
    v-model="isOpen"
    scrim="rgba(40, 41, 35, 0.35)"
    location="top"
    origin="top"
    offset="16"
    max-width="620"
    content-class="search-overlay__content"
  >
    <div class="search-overlay">
      <v-text-field
        ref="inputRef"
        v-model="query"
        variant="solo"
        density="comfortable"
        placeholder="Search articles…"
        hide-details
        @keydown.enter.prevent="submit"
        @keydown.esc.prevent="close"
      >
        <template #prepend-inner>
          <v-btn
            icon
            variant="text"
            density="comfortable"
            aria-label="Search"
            @click="submit"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </div>
  </v-dialog>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  closeSearchOverlay,
  isSearchOverlayOpen,
} from "@/search/searchOverlayStore";

const router = useRouter();
const query = ref("");
const inputRef = ref(null);

const isOpen = computed({
  get: () => isSearchOverlayOpen.value,
  set: (v) => {
    if (!v) closeSearchOverlay();
  },
});

watch(
  () => isSearchOverlayOpen.value,
  async (open) => {
    if (!open) return;
    await nextTick();
    inputRef.value?.focus?.();
  }
);

function close() {
  closeSearchOverlay();
}

async function submit() {
  const q = query.value.trim();
  if (!q) return;

  await router.push({ name: "Search", query: { q } });
  close();
}
</script>

<style scoped>
:deep(.search-overlay__content) {
  /* Dialog content is teleported; :deep ensures this applies under <style scoped>. */
  align-self: flex-start;
  margin-top: 8vh;
  width: min(720px, calc(100vw - 2rem));
}

@media (min-width: 960px) {
  :deep(.search-overlay__content) {
    /*
      When the nav drawer is permanently visible (width ~300px),
      shift the overlay right by half that width so it centers over main content.
    */
    transform: translateX(calc(var(--nav-drawer-width, 300px) / 2));
  }
}

.search-overlay {
  padding: 0;
}

.search-overlay :deep(.v-field) {
  border-radius: 999px;
  background: rgba(252, 248, 243, 0.78) !important;
  border: 1px solid rgba(40, 41, 35, 0.14);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  overflow: hidden;
}

.search-overlay :deep(.v-field__input) {
  font-family: "Source Serif 4", Georgia, serif;
  font-size: 1.15rem;
  line-height: 1.35;
  color: rgba(40, 41, 35, 0.92);
}

.search-overlay :deep(.v-field__prepend-inner) {
  padding-inline-start: 4px;
}

.search-overlay :deep(.v-field__prepend-inner .v-btn) {
  opacity: 0.88;
}
</style>

