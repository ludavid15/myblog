<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>About Me</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus mollitia similique soluta rem quisquam! Aspernatur temporibus eum necessitatibus maiores nostrum, repudiandae minus numquam expedita consectetur vitae, laudantium debitis voluptas voluptate?</p>
      
        <v-card-text>
          <!-- v-html renders raw HTML -->
          <div v-if="htmlContent" v-html="htmlContent"></div>
          <v-progress-circular v-else indeterminate></v-progress-circular>
        </v-card-text>


      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      htmlContent: "",
    };
  },
  mounted() {
    this.loadBlogContent();
  },
  methods: {
      async loadBlogContent() {
        try {
          // Fetch the HTML file from the public/blog directory
          const response = await fetch("/blog/posts/example.html");
          if (!response.ok) {
            throw new Error(`Failed to load content: ${response.status}`);
          }
          // Convert response to text and set it to htmlContent
          this.htmlContent = await response.text();
        } catch (error) {
          console.error("Error loading blog content:", error);
        }
      },
    },
}

</script>