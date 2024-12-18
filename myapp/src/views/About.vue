<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>About Me</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

        <test />
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import test from '@/posts/test.md';

export default {
  components: {
    test,
  },
}
</script>
