<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" >
        <h1 class="text-h3 font-weight-light mb-8">Welcome to my Website!</h1>
        <p class="text-h6 mb-4">
          This is my blog where I write about things I've learned. It serves as a sort of record 
          of things I've done as time inevitably erodes my memory. It's also a handy reference in
          case I need to go back and review something. Maybe some of it will be useful for you!
        </p>
        <p class="text-h6 mb-8">
          This is a static website built from scratch using Vue and hosted on AWS in an S3 bucket. 
          Development and deployment are managed locally using a Docker container. I use Route53 
          and CloudFront to serve this website to the internet. 
        </p>
        
        <h2>Recent Articles</h2>
        <v-divider :thickness="5" class="mb-4"></v-divider>

        <!-- Render Posts as Individual Cards -->
        <v-row>
          <v-col
            v-for="(post, index) in flattenedPosts"
            :key="index"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card 
              hover 
              outlined 
              class="my-4"
              :to="{
                    name: 'blog-post', // Identifies the route by name
                    params: { topic_path: post.topicPath, post_path: post.path }, // Pass params for dynamic path
                    query: { meta: JSON.stringify(post) } // Pass additional metadata as query
                  }">
              <v-card-title>{{ post.title }}</v-card-title>
              <v-card-subtitle>
                <v-icon small class="mr-2">{{ post.topicIcon }}</v-icon>
                {{ post.topicName }}
              </v-card-subtitle>
              <v-card-text>
                <p><strong>File:</strong> {{ post.file }}</p>
                <p><strong>Path:</strong> {{ post.path }}</p>
                <p><strong>Author:</strong> {{ post.author }}</p>
                <p><strong>Date:</strong> {{ post.date }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      topics: [],
    }
  },
  computed: {
    // Flatten the topics and posts into a single array
    flattenedPosts() {
      return this.topics.flatMap((topic) =>
        topic.posts.map((post) => ({
          ...post,
          topicName: topic.name, // Add topic name
          topicIcon: topic.icon, // Add topic icon
          topicPath: topic.path, // Add topic icon
        }))
      );
    },
  },
  async created() {
    try {
      const metadataResponse = await fetch("/posts_directory.json");
      this.topics = await metadataResponse.json();
      console.log("Directory loaded:", this.topics);
    } catch (error) {
      console.error("Error loading directory:", error);
    }
  },
}
</script>