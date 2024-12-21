<template>
  <v-btn
    v-show="visible"
    class="back-to-top"
    color="secondary"
    fab
    @click="scrollToTop"
    icon="mdi-arrow-up"
  >
  </v-btn>
</template>

<script>
export default {
  name: "BackToTopButton",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    checkScroll() {
      this.visible = window.scrollY > 200;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.checkScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.checkScroll);
  },
};
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}
</style>
