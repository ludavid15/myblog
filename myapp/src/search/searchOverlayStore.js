import { ref } from "vue";

export const isSearchOverlayOpen = ref(false);

export function openSearchOverlay() {
  isSearchOverlayOpen.value = true;
}

export function closeSearchOverlay() {
  isSearchOverlayOpen.value = false;
}

export function toggleSearchOverlay() {
  isSearchOverlayOpen.value = !isSearchOverlayOpen.value;
}

