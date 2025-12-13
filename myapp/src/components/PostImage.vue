<template>
  <figure v-if="img" class="d-flex flex-column align-center">
    <img
      :src="img.display"
      :alt="alt"
      loading="lazy"
      :width="img.width"
      :height="img.height"
      class="rounded-lg mb-2"
      style="max-width: 100%; height: auto;"
    />
    <figcaption v-if="caption" class="text-subtitle-2 text-center mb-4">
      {{ caption }}
    </figcaption>
  </figure>

  <p v-else style="color: red;">
    Missing image: {{ id }}
  </p>
</template>

<script setup>
import media from "@/data/media-manifest.json";

const props = defineProps({
  id: { type: String, required: true },
  alt: { type: String, default: "" },
  caption: { type: String, default: "" }
});

const img = media[props.id];
</script>
