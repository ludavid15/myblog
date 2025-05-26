<template>
  <v-btn 
    @click="handleClick" 
    :color="liked? 'success' : 'primary'" 
    density="comfortable"
    outlined
    elevation="0"
    prepend-icon="mdi-thumb-up">
    {{ liked ? 'Liked' : 'Like' }}
    <span class="like-count">{{ count }}</span>
  </v-btn>
</template>

<script>
import { useRoute } from 'vue-router';

const apiUrl = "https://v0adenqpud.execute-api.us-west-2.amazonaws.com/default/handleBlogLikes"

export default {
  name: "LikeButton",
  data() {
    return {
      count: 0,
      liked: false,
      pageId: null
    }
  },
  mounted() {
    const route = useRoute();
    this.pageId = route.params.slug;
    this.initialize();
  },
  methods: {
    initialize() {
      if (!this.pageId) return;
      const localKey = `liked-${this.pageId}`;
      this.liked = localStorage.getItem(localKey) === 'true';
      this.fetchLikes();
    },
    async fetchLikes() {
      try {
        const res = await fetch(`${apiUrl}?page=${this.pageId}`);
        const data = await res.json();
        this.count = data.likes || 0;
      } catch (err) {
        console.error('Failed to fetch like count:', err);
      }
    },
    async handleClick() {
      if (this.liked || !this.pageId) return;

      try {
        await fetch(`${apiUrl}?page=${this.pageId}`, {
          method: 'POST'
        });

        this.count++;
        this.liked = true;
        localStorage.setItem(`liked-${this.pageId}`, 'true');
      } catch (err) {
        console.error('Error liking post:', err);
      }
    }
    
  },
  watch: {
    '$route.params.slug'(newSlug) {
      this.pageId = newSlug;
      this.initialize();
    }
  }
}
</script>

<style scoped>
.like-count {
  margin-left: 8px;
  font-weight: bold;
}
</style>