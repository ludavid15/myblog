# My Blog

Welcome! This is the root directory of my blog. This README file is a notepad where I can put down my ideas and things I've learned. As such, it will be very unstructured.

## Architecture

### Frontend

The primary frontend is going to be a containerized Vue.js application. I'm not going to download Node.js onto my local machine, but rather use a Docker container for everything instead. This means that in order to test, I will need to build and run my Docker container.

But rather than run Docker Build everytime, I'm going to write a `docker-compose.YAML` file to save all my build configurations (i.e. port binding, etc.). So the basic folder structure of things are going to be:

```
> Root Folder
    > frontend_service
        > public
            > index.html
        > src
            > assets
            > components
                > location for more .vue components
            > App.vue
            > main.js
        > Dockerfile
        > package.json
    > compose.yaml
```

The Dockerfile will look at the `package.json` for metadata about my frontend service, specifically any dependencies. It also gets a copy of the source code using another `COPY` directive. Meanwhile my `compose.yaml` file will list this "frontend-service" as one of the services to spin up, and includes the commands to build and run this image. Since I'm only really building via Docker Compose, I'm going to specify the image name and tag in this `.yaml` file, rather than within the `package.json` file. 

### Running NPM Serve in the Container

Normally, to develop a Vue application we would use some kind of service to serve our code and make it accessible on our local web browser. Because I'm doing everything through Docker, I need to re-create this within the container. To do this, I need to define the `npm run serve` script within my `package.json` file, and then execute it when I spin up my containers. Do to this, I can put the command either in the Dockerfile, or the YAML file. Any commands in the YAML will override commands in the image-specific Dockerfile. The Vue CLI includes a serve service, which is what I'll be using. 

```
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
},
"dependencies": {
    "vue":"^3.5.13"
},
"devDependencies": {
    "@vue/cli-service": "^5.0.0"
}
```

### Routing

While there are many ways to setup routing, the approach I've selected is to have only 1 true "route" object for all my blog posts, but with dynamic parameters so that I'm navigating with `params`. Let's start with the route definition in my index.js file. 

```
  {
    path: '/:topic/:post',
    name: 'blog-post',
    component: PostPage,
    props: true
  }
```

Again, note that I'm not iterating through an array and creating a route for each blog post. There is only one route! The path is entirely dynamic and set by the `topic` and `post` parameters passed into the router-link. On my Navigation Drawer component, I'm iterating through an array of topics and posts and passing them into the link definition. Thus it renders a unique button for every topic/post combination.

```
<v-list-item
  v-for="post in topic.posts"
  :key="post"
  :title="post"
  :to="{ name: 'blog-post', params: { topic: topic.name, post:post } }"
  >
</v-list-item>
```

Finally within each BlogPost.vue file, I'm defining a few props. These are input parameters which will scope the content of this particular blog post. Once that's defined, the actual content of the post itself is fetched from an `.html` file. 

```
<script>
export default {
  name: "BlogPost",
  data() {
    return {
      content: '',
      metadata: []
    }
  },
  props: {
    topic: {
      type: String,
    },
    post: {
      type: String,
    }
  },
  async created() {
    const response = await fetch(`/generated/test.html`);
    this.content = await response.text();

    const metadataResponse = await fetch("/posts_directory.json");
    this.metadata = await metadataResponse.json();
  },
};
</script>
```

### Code Pipeline

In order to avoid dynamically rendering and fetching markdown posts in the browser, I'm going to render my markdown at build-time. Here's the basic idea:

1. I write my blog posts in markdown, and save them in some kind of repository. I want to keep the location where I write my blogs separate from my application code. 
2. At build-time, I have a script that converts these files into `.html` and saves them into the folder structure. 
3. Now these static html assets can be injected into my Vue code.  
4. Finally, I setup a code build and code delivery pipeline so that when I commit changes to my markdown blog files, the rendering script is run, then `npm run build` is executed to build my website, and then I can deploy these into my S3 bucket. 

To fetch these rendered html assets, I just need to include code like this in my `BlogPost.vue` file. Of course, in this example the html file name is hard-coded so every blog-post would render what's in `test.html`. In practice I'd want to make this variable dynamic, maybe dependent on the URL or based on some props that are passed in. 

```
<script>
export default {
  async created() {
    const response = await fetch(`/generated/test.html`);
    this.content = await response.text();
  },
};
</script>

<template>
  <v-card>
    <div>
      <article v-html="content"></article>
    </div>
  </v-card>
</template
```