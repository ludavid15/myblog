---
title: "Intro to Vue"
topic: "Computer Science"
path: "into-to-vue"
author: "David Lu"
date: "2024-11-29"
preview: "This a beginner's guide to making applications using Vue. Vue is a javascript framework which makes it easier to develop dynamic frontends."
---

This a beginner's guide to making applications using Vue. Vue is a javascript framework which makes it easier to develop dynamic frontends.

# Basics

<v-divider></v-divider>

## Single Page Application

A modern Vue based approach to website building is to create what's called a *Single Page Application*. In this architecture, the entire website exists as a Vue project, which generates the HTML, handles events, and selects what to display. In other words, your browser makes a single request to the server for all the code right and the beginning, and then any further user interactions on the website are handled client-side on the local browser, rather than through additional requests to the server.

```javascript
// JS File
const app = Vue.createApp({
    // Define your data, functions, etc
    template: '<h2>Hello World</h2>'    // HTML Code
    data() {},
    methods: {},
    computed: {}
})
app.mount('#app')                       // Any kind of selector

// HTML File
<div id="app"><\div>
```

## Data Functions
These variables are only accessible within the HTML element to which the Vue App has been mounted.

```javascript
// Within Vue.createApp
data(){
    return {
        title: 'Star Trek',
        producer: 'Gene Roddenberry',
        episodes: 53
    }
}

// HTML
<p>{{title}}</p>
```

## Buttons and Events

```javascript
// Also within Vue.createApp
methods:{
    incrementEpisode(number){
        console.log("Button Clicked")
        this.episodes += number
    }
}

// HTML
<button v-on:click="incrementEpisode(27)">Add Episode</button>
```

Note that there is a shortcut for events `v-on:` can be replaced using the `@` symbol. If you want the button to call a function on an event, you can just pass it the name of the function (e.g. by reference) and leave out the `()` (e.g. no need to invoke it), unless you want to also pass in an argument. 

When an event occurs and you trigger a function, the event object is passed automatically into the function. This event object actually contains a lot of information about the type of event, which you may find useful depending on the application. 


## Conditional Rendering

```html
<p v-if="toggleStatus">Status is True!</p>
<p v-else>Status is False!</p>

<p v-show="toggleStatus">Status is True!</p>
```

There is a subtle difference between using `v-if` from `v-show`. If the condition is false, v-if takes the element out of the DOM entirely, but v-show just hides it using CSS. Hiding is faster, which makes it more suitable for frequently visible or hidden elements, such as a drop down menu. 


## For Loops

```javascript
data() {
    return{
        books: [
            {title: 'Great Gatsby', author: 'Scott Fitzgerald'},
            {title: 'War and Peace', author: 'Leo Tolstoy'},
            {title: 'Sound and the Fury', author: 'William Faulkner'},
        ]
    }
},
methods: {
    ...
}

// HTML
<ul>
    <li v-for='book in books>
        <h3>{{ book.title }}</h3>
        <p>{{ book.author }}</p>
    </li>
</ul>
```

## Dynamic HTML Attribute Binding
By default, attributes are static. If you want to set an attribute dynamically to a variable, you need to use attribute binding. 

```javascript
data() {
    return {
        url: 'www.google.com',
        ...
    }
}

<a v-bind:href="url">This takes you to a website!</a>
<img :src="book.image" :alt="book.title"></img>
```

As you might expect, there is a shorthand for this as well. Instead of writing `v-bind:` can you just use the semicolon, `:` instead. You can combine this attribute binding with conditionals to customize the style of different blocks. Just make the `class` attribute dynamic as well!


## Forms and Inputs

```javascript
<template>
    <form>
        <label>Email:</label>
        <input type="email" required v-model="email">
    </form>
</template>


<script>
export default{
    data() {
        return {
            email: ''
        }
    }  
}
</script>
```

We can make use of `v-model` to create 2-way data binding. Applying this to the input means that any user keystroke gets saved to the email variable. But this also works in reverse, any update to the email variable would also show up in the form input. 


## Full Vue Applications
A basic application will have the following folders and files. We'll go over each one in depth. 

```shell
> node_modules
> public
    > index.html
> src
    > App.vue
    > main.js
> package.json
> package-lock.json
```

#### Node Modules
This folder contains all your libraries. It is installed by your node package manager when you run `npm install`. Generally, you should leave this folder alone. Details of which dependencies you have should go into the `package.json` file.

#### Public
This folder contains your `index.html` file. However, we're not going to actually code very much html in this page. Rather, it should just include some header information, and then an element with the `app` class. 

#### Source Code, Main.js, and App.vue
The source folder is where all your Vue code will exist (all the components, CSS, templates, etc.). In this folder, there is a main.js file, which kicks everything off by *mounting* your application (remember, this attaches it to an html element). 

```javascript
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

Meanwhile your App.vue file is going to be the root component of your application. Every Vue file has the following three sections: a template, a script, and some styling. Each Vue file is structured as a "single file component". In other words, all the code needed for a component is in a single file. 

```javascript
<template></template>

<script>
export default {
    name: 'App',
    components: {
        ...
    }
}
</script>

<style></style>
```

#### Package.json and Package-lock.json
The `package.json` file contains the important metadata about the project. These can include attributes like:

1. Name
2. Version
3. Description
4. Main (the entry point, e.g. index.js)
5. Scripts
6. Repository
7. Author
8. Keywords

And many, many more. As your project grows and you need to customize more things, you may begin to add more attributes. In contrast, the `package-lock.json` file records the exact version of each installed package which allows you to re-install them. Future installs will be able to build an identical dependency tree using this. If the regular package file is a high level summary of your project, the lock file is a detailed, precise, and immutable manifest of all the installed dependencies and their versions. This lock file is typically automatically generated when you run `npm install` for the first time. 


### Vue Files
Every Vue file has three sections: the template, the script, and the styles. A template is always required, but the others are not. Also, even though each page will have a section for CSS, those styles are actually applicable globally. In other words, the fact that each Vue file contains its own style section is an organizational trick only, and isn't a reflection of scope. The way around this is to apply a `scoped` tag to the styles section, or you could make the CSS selector more specific (e.g. applicable to the current component only).

```javascript
<style scoped>
</style>
```

# Intermediate Vue Concepts

<v-divider></v-divider>

## Props
Props allow you to pass information from a parent component to a child component. For example, maybe you want to show an array of sticky notes each with their own title and content. Rather than hard-code each sticky note, you want to pass in the data so you can reuse the sticky note component.

Within the parent component, you would create a component and then just pass in the data as an attribute.

```javascript
<template>
    <Note title="Shopping List" text="Apples, Oranges" />
</template>
```

Within the Note component, you need to define the props. Then you can use them like you would use any `data()` that was defined.

```javascript
<template>
    <h1>{{ header }}</h1>
    <p>{{ text }}</p>
</template>

export default {
    props: ['header', 'text'],
    data() {
        return {
            ...
        }
    }
}
```
However in most cases you'll probably want to be setting the input attributes dynamically to variables, rather than as static strings. This is done with v-bind. 

```javascript
<template>
    <Note :title="title_variable" :text="text_variable" />
</template>
```

## Custom Events
A custom event is an event that is produced by a component, and can be picked up by any parent components. This is achieved by adding an `$emit` method. In the following example, we've created a method that produces a custom event called "close" which we could then use just like a click event.

```javascript
closeNote(){
    this.$emit('close')
}
```

## Slots
If you want to pass a template into a component rather than variables, you can use what's called a slot. There's a basic generic slot you can use, but you can also create *named* slots. This is useful if you want to pass in only certain pieces and into a specific structure. 

```javascript
// Parent File Calling the Component
<Modal>
    <template v-slot: links>
        <a href=#"> Sign up Now! </a>
    </template>
    <h1> Title </h1>
    <p> Lorem Ipsum </p>
</Modal>

// Within the Template section of the Component
<div class="modal">
    <slot>Default content that is shown if nothing is passed in</slot>
    <slot name='links'></slot>
</div>
```


## The Vue Router
A router is used to navigate between pages. In a full Vue application, Vue intercepts any requests made to navigate to different pages, and renders the appropriate component. The folder structure changes, now there is a **views** folder and a **router** folder. The latter should also contain an `index.js` file. 

```javascript
> src
    > assets
    > components
    > router
        > index.js
    > views
        > Home.vue
        > About.vue
    > App.vue
    > main.js
```

Within the index.js page, you would declare an array of routes, and use the `createRouter` function. 

```javascript
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'About',
        component: About
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
```

Meanwhile your main.js page and App.vue would also look different. Within your main.js page, you should modify your createApp function call to use the router object you created.

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')  // Addition of use(router)
```

And your App.vue file would create links to routes using the following syntax:

```javascript
<template>
    <div id='nav'>
        <router-link to "/">Home</router-link>
        <router-link to "/about">About</router-link>
    </div>
    <router-view/>
</template>
```

## Fetching Data

In this example, we are calling an asynchronous function to fetch data from a JSON server when the "mount" event/hook takes places. Remember that this occurs at the very beginning in our `main.js` file. Then, we can take the fetched data and store it within some component data. 

```javascript
<script>
export default {
    data() {
        return {
            jobs: null
        }
    },
    mounted(){
        fetch('http://localhost:3000/jobs')
            .then( (res) => res.json() )
            .then( data => this.jobs = data)
            .catch( err => console.log(err.message))
    }
}
</script>
```

Since the fetch request is async, we need some way for Vue to update any components (or withold displaying them) that use this fetched data only until the request is complete. (Otherwise, we will see an error if we try to access `job.title` before the fetch query has been completed).

```javascript
<template>
    <div v-if="job">
        <h1>{{ job.title }}</h1>
    </div>
</template>
```


# The Composition API

<v-divider></v-divider>

As your project gets more advanced, you may find it problematic that your data, methods, and hooks are all in their own areas within the code. This structure is known as the "Options API". In contrast, the Composition API allows us to group similar things together. This opens up better capability for re-using and organizing our code, but requires a better understanding of reactivity, and is generally a bit more complex. 


```javascript
<script>
export default {
    setup() {
        let name = 'Mario'
        let age = 30

        return { name, age }
    }
}
</script>
```

The `setup` function always runs first, and returns **non-reactive** variables which can be used in the template. Note that this means we can't make use of the `this` keyword within the setup function. In order to make those variables reactive, you can replace the values with references. Now, you can setup your even handlers to modify those values and your template will treat them dynamically. 

```javascript
let name = ref('Mario')

const handleClick = () => {
    name.value = 'Luigi'
    age.value = 35 
}
```


# Vuetify

<v-divider></v-divider>

Vuetify is a materialUI library for Vue. It includes components and other tools already styled according to the materialUI guidelines that make it easier to build nice looking applications. 

## Getting Started

To begin, we need to make sure that we're using Vuetify when we create our app. This code brings in everything, and allows us to access Vuetify's components in the rest of our project. Note that if we're also using `vue-router`, we'd have to specify that as well. 

```javascript
import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')
```

And then make sure you update your package.json file accordingly as well. In particular, keep an eye out for Vuetify's dependencies, in addition to Vuetify itself. You may also need to import an icon-set from somewhere. 

```javascript
import { aliases, mdi } from 'vuetify/iconsets/mdi'
```

# References

<v-divider :thickness="5"></v-divider>

* NetNinja. (2020, December 20). Vue JS 3 Tutorial. YouTube. https://www.youtube.com/watch?v=YrxBCBibVo0 
* A Vue Component Framework. Vuetify. https://vuetifyjs.com/en/ 
* A Progressive Javascript Framework. Vue. https://vuejs.org/