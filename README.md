# My Blog

Welcome! This is the root directory of my blog. This README file is a notepad where I can put down my ideas and things I've learned. As such, it will be very unstructured.

## Architecture

This website is a static single page Vue application. Docker provides the primary means of building the site, and also serving it for testing during development. Instead of running build or serve commands on my local machine, the only command I run is `docker-compose up --build`. Here is the approximate folder structure:

```
> Root Folder
  > myapp
    > dist
    > public
    > scripts
    > src
    Dockerfile
    index.html
    package.json
    vite.config.js
  > .gitignore
  > compose.yaml
```

Here is what each folder contains:

1. **dist**: This where the completed build files go. Just take the contents of this folder and copy/paste it into your S3 bucket or other website hosting service.
2. **public**: At the moment this only contains my favicon file.
3. **scripts**: At build-time, I run a few scripts to process my various blog-post files and extract useful metadata which the website will use later. These scripts are called within the Dockerfile.
4. **src**: This is where the majority of my code lives. This folder contains all the Vue files and blog posts and logic needed for my website. 

### Docker Compose

Within my Docker Compose setup, I'm spinning up two services. The first one builds the website. This creates a set of build files in the container. These files are copied out of the container and onto my local machine using Docker Volumes. The build files are what I need to place into AWS S3 to make my website available on the internet. 

```
vue-build:
  build:
    context: ./myapp
    dockerfile: Dockerfile
  volumes: 
    - ./myapp/dist:/myapp/dist
  command: npm run build
```

The second service is a server. This spins up a server so I can access my website from my own browser (so I can test my code during the development process). In order to make this website accessible outside the container, I use port-binding. 

```
  vue-server:
    build: 
      context: ./myapp
      dockerfile: Dockerfile
    image: my-blog:1.0     # Specify the Image Name
    ports:
      - 5173:5173
    depends_on:
      - vue-build
    command: npm run dev -- --host 0.0.0.0
```

### Dockerfile

Within my dockerfile, the first step is to copy over my `package.json` files and install my dependencies. I put this step first to take advantage of Docker's cache system. I don't want to re-install dependencies every time I update the content on my website. As long as the `package.json` file remains unchanged, Docker will use the cached layer from the last image build and skips performing `npm install` again. After that, I copy the rest of my files into the container. Next I run two scripts. These scripts go through my blog posts (markdown files) and extracts the frontmatter and does some other sorting to create `data.json` files that I'll need later. Finally, I call `npm build` to build my website. 

```
FROM node:19-alpine

COPY package.json /myapp/
WORKDIR /myapp
RUN npm install

COPY scripts /myapp/scripts
COPY public /myapp/public
COPY src /myapp/src
COPY index.html /myapp/
COPY vite.config.js /myapp/

RUN node scripts/extract-headings.js
RUN node scripts/extract-frontmatter.js
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```


### Routing

While there are many ways to setup routing, the approach I've selected is to have only 1 true "route" object for all my blog posts, but with dynamic paths. Let's start with the route definition in my index.js file. 

```
  {
    path: '/posts/:slug', // Dynamic route for markdown posts
    name: 'BlogPost',
    component: BlogPost,
    meta: { title: "Blog" },
    props: true,
  },
```

Again, note that I'm not iterating through an array and creating a route for each blog post. There is only one route! The path is entirely dynamic and set by slug. On my Navigation Drawer component, I'm iterating through an array of topics and posts and passing them into the link definition. Thus it renders a unique button for every topic/post combination. When the user clicks a link to a blog post, they are taken to the BlogPost.vue page, which we will look at next. 

```
<v-list-item
  v-for="(post, index) in data.posts"
  :key="index"
  :to="`/posts/${post.slug}`"
  @click="handleNavClick"
  >
  <v-list-item-title 
    class="text-body-2"
    style="padding-left: 10px;">
    \{\{ post.title \}\}
  </v-list-item-title>
</v-list-item>
```

### Fetching Blog Posts

The BlogPost.vue file is itself just an empty template. The data that goes into the template is defined using reactive variables. This means that when they change, the website updates dynamically re-render with the new values. 

```
// Refs and route
const route = useRoute();
const postContent = ref(null);
const frontmatter = ref(null);
const headings = ref([]);
const loading = ref(true);
```

What can trigger changes to these variables? Well, either when the route changes, or during the initial component mount. When these events happen, I call the `loadMarkdown` function. 

```
// Watch for route changes
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) loadMarkdown(newSlug);
  },
  { immediate: true } // Trigger immediately on component mount
);

// On component mount
onMounted(() => {
  if (route.params.slug) loadMarkdown(route.params.slug);
});
```

The `loadMarkdown` function recieves the website slug, and uses this to fetch the corresponding blog post. It then updates all those reactive variables I talked about earlier. Thus, the BlogPost.vue page will then render the specific contents of that blog post. It'll look like its own unique page, with its own unique path, but really it's just one page being dynamically updated. 

```
// Dynamically import markdown files
const loadMarkdown = async (slug) => {
  try {
    if (!slug) return; // Guard clause in case slug is undefined

    loading.value = true;

    // Use import.meta.glob to dynamically load markdown files
    const markdownFiles = import.meta.glob('/src/posts/*.md');
    const filePath = `/src/posts/${slug}.md`;

    if (markdownFiles[filePath]) {
      const module = await markdownFiles[filePath]();
      postContent.value = markRaw(module.default);
      frontmatter.value = module.frontmatter || {}
      headings.value = headingsData[`${slug}.md`] || [];
    } else {
      postContent.value = null;
      frontmatter.value = null;
    }
  } catch (error) {
    console.error('Error loading markdown file:', error);
    postContent.value = null;
    frontmatter.value = null;
  } finally {
    loading.value = false;
  }
};

```

### Importing Markdown Files

I originally build this website using Webpack and the Vue CLI, but I switched over to Vite primarily so that I could use `vite-plugin-md`. This plugin to Vite allows me to import markdown files directly into my Vue code. Furthermore, those markdown files don't have to be all in markdown either, they can contain Vue code. This allows me to write things like: 

```
# The Lifecyce of Data. 

<v-divider></v-divider>

Why do we discuss the lifestyle of data? Because data analytics is not just about obtaining results, it's about collecting, managing, and then closing out a process. 
```

Prior to this, I was running markdown-it at build-time and then fetching the converted file at runtime, but this limited me to only markdown syntax and basic html in my blog posts. I wanted to be able to use vuetify components, like tables and cards mixed in, and this plug-in gave me an easy way to do that. 


### Vite Configuration

As part of adding Vite, I needed to add a `vite.config.js` file to my code. Mostly, I use it to configure my plugins. Some specific things I added were:

1. **mathjax3** - for rendering equations in my markdown.
2. **Prism** - for code coloring and syntax highlighting in my markdown.
3. **anchor** - to create links from my markdown headers that can be navigated to (used to create the table of contents side-bar on my blog posts.)


```
export default defineConfig({
  plugins: [
    vue({ 
      include: [/\.vue$/, /\.md$/],
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('mjx-'), // Ignore MathJax tags
        },
      },
    }),
    Markdown({
      builders: [code(), meta(), link()], 
      markdownItSetup(md) {
        md.use( mathjax3 );
        md.use( Prism );
        md.use( anchor, {
                permalink: false, // Add anchor links
                slugify: (str) =>
                  str
                    .trim()
                    .toLowerCase()
                    .replace(/[\s]+/g, '-') // Replace spaces with hyphens
                    .replace(/[^a-z0-9\-_]+/g, '') // Remove invalid characters but keep hyphens and underscores
                    .normalize('NFKD') // Normalize Unicode to handle accents
                    .replace(/[\u0300-\u036f]/g, ''), // Remove diacritical marks
              });
      },
    }),
  ],
  server: {
    historyApiFallback: true, // Enable fallback for SPA routing
    host: '0.0.0.0',          // Expose the server to external hosts (Docker)
  },
  resolve: {
    alias: {
      '@': '/src', // Ensures the @ alias still works for imports
    },
  },
});
```

## Miscellaneous Things

### Changing the Page Title

Have you noticed that the browser tab displays the title of the website or page that you are on? For example if you are on YouTube it might say **Youtube - Video Name**. These names are also what would appear if you did a Google search. To set these dynamically for my blog posts, I have this function in my `index.js` file. 

```
// Add a navigation guard to dynamically set the title
router.beforeEach((to, from, next) => {
  // Default to the meta title
  let title = to.meta.title;

  // If the route has a slug, customize the title
  if (to.name === 'BlogPost' && to.params.slug) {
    title = `Notes - ${to.params.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')}`;
  }

  // Update the document title
  document.title = title || 'Default Website Title';

  next();
});
```


### Loading Screen

I noticed that for especially long blogs with a lot of math, they would take a while to load. This created a jarring effect on my website because I would click a button to navigate to something else, but nothing would change. A temporary fix was to put in a loading circle that pops up immediately when I press a navigation button. It doesn't change the fact that some articles take longer to load (which is the more fundamental issue) but it at least smoothes out the user experience in the meantime. The implementation was pretty straightforward:

```
<!-- Show Loading Screen -->
  <v-row v-if="loading" class="d-flex justify-center align-center" style="height: 300px;">
    <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
  </v-row>

<!-- Show Content When Loaded -->
  <v-row v-else>
    <v-col cols="12">
```

This uses a reactive variable called `loading` which is immediately set to true when the slug changes, and only set back to false after the fetch operation has completed (or failed). (See the `loadMarkdown` function from earlier).