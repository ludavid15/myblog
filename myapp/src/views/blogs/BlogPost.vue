<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" >
        <v-breadcrumbs :items="['home', topicPath, postPath]"></v-breadcrumbs>
        <div class="text-h3 px-1">{{ postMeta.title }}</div>
        <v-divider :thickness="5" class="ma-1"></v-divider>
        <div class="text-subtitle-1 text-medium-emphasis px-1 my-2">Last Updated: {{ postMeta.date }}</div>

        <!-- Render Markdown Content -->
        <v-container class="pa-1">
          <div>
            <article class="markdown-content" v-html="content"></article>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BlogPost",
  data() {
    return {
      content: '',
    }
  },
  props: {
    topicPath: String,    // Used for the path
    postPath: String,     // Used for the path
    meta: Object
  },
  computed: {
    postMeta() {
      return this.meta || {};
    },
    htmlFileName() {
      if (this.postMeta.file) {
        return this.postMeta.file.replace(/\.md$/, '.html');
      }
      return 'test.html'; // Fallback if file property is missing
    }
  },
  async created() {
    await this.fetchContent();
  },
  watch: {
    // Watch for changes in htmlFileName
    htmlFileName: 'fetchContent',
  },
  methods: {
    // Method to fetch content based on the current HTML file name
    async fetchContent() {
      try {
        const response = await fetch('/generated/' + this.htmlFileName);
        if (!response.ok) {
          throw new Error(`Failed to load file: ${this.htmlFileName}`);
        }
        this.content = await response.text();
        
      } catch (error) {
        console.error('Error fetching file:', error.message);
        this.content = '<p>Error loading content.</p>';
      }
    },
  }
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

