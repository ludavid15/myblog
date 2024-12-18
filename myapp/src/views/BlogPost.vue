<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" >
        This is a Blog Post Page
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BlogPost",
};
</script>

<style>
.markdown-content ol,
.markdown-content ul {
    padding-left: 1.5rem;
    margin-bottom: 1.1rem;
}
.markdown-content li {
    list-style-position: inside;
}
.markdown-content p {
    margin-bottom: 1.1rem;
}
</style>

