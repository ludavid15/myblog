<template>
  <v-footer class="footer-banner">
    <v-container class="d-flex justify-center">
      <div class="footer-inner">
        <div class="footer-text">Thanks for reading! All ideas are my own, and do not reflect the positions of my employer or affiliates.</div>
        <v-divider thickness="2" width="40" />
        <div class="footer-text">
          Version 2.09 · December 2025
        </div>
      </div>
    </v-container>
  </v-footer>
</template>


<style scoped>

.footer-banner {
  height: 48px;
  flex-shrink: 0;
  background: transparent;
}

.footer-inner {
  height: 100%;
  display: flex;
  flex-direction: column;   /* vertical stacking */
  align-items: center;
  justify-content: center;  /* keeps it visually centered */
  gap: 4px;
}

.footer-text {
  font-size: 0.85rem;
  opacity: 0.6;
}

</style>