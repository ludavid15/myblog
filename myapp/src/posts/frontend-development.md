---
title: "Frontend Development"
topic: "Computer Science"
path: "frontend-development"
author: "David Lu"
date: "2024-11-22"
preview: "This article gives a high level overview of how frontends are developed, and the tools required to do so."
---

This article gives a high level overview of how frontends are developed, and the tools required to do so. There's a little bit of HTML and other basics here, but if you want a more in-depth discussion of Javascript/Vue/Typescript you should checkout their individual pages. 

# Tool Overview

<v-divider></v-divider>

## HTML

Or Hyper-Text Markup Language is what defines your website structure. The `<DOCTYPE>`, `<html>`, and `<body>` tags should be in every file. Everything within the `<body>` is what is ultimately visable on your website. After that, you can create structure using HTML elements - basically, a start tag, some content, and an end tag. 

If you need to modify the attributes of an element (like setting the source or font), you can specify them within the start tag. 

```html
<!DOCTYPE html>
<html lang="en">
    <body>
        <h1> Hello world! </h1>
        <p> I like to code </p>
        <a href="http://website.com">Link</a>
    </body>
</html>
```

## CSS
Or Cascading Style Sheet is used to define your website's style. A CSS file defines things like padding, color, and fonts. An important thing to know with CSS files is the idea of a selector. In this example, the first CSS chunk will apply to all `<p>` elements. The second will only apply to elements with that particular class, i.e. `<p class=container>`. The final selector is an ID selector - it applies only to a specific element in your HTML with the `<p id="para1"`>.


```css
p {
  color: red;
  text-align: center;
}

.container {
  color: red;
  text-align: center;
}

#para1 {
  text-align: center;
  color: red;
}
```

## Javascript
This is the programming language foundation that makes your website dynamic. If you want to handle user-clicks, validate form data, show pop-ups, or get data from a backend, you need javascript. 

## Typescript
This is a language built on top of Javascript that adds static typing and additional features to write more robust code.

## UI Toolkit
Also known as frameworks, these make it easier to build modern and reusable UI's. Common ones are React, Vue, and Angular. 


# Concepts

<v-divider></v-divider>

## The Document Object Model

A DOM is created everytime a website is loaded on your browser. It's a arranged as a tree of HTML objects, and it's also how Javascript can modify the HTML of your website to make it dynamic. 

> The DOM is tree of objects, which taken together map out the structure of all HTML elements. 

For each object in the DOM, there's really only two things to do:
1. Method - an action, such as read, write, create, destroy.
2. Property - the subject of a method, or the value you are changing.

Here's a basic example of how to use the DOM with Javascript to change the value of some static HTML:

```html
<p id="p1">Hello World!</p>

<script>
document.getElementById("p1").innerHTML = "New text!";
</script>
```

You can also add new "Nodes" with Javascript. This example creates a new paragraph node with a child paragraph, and then appends it to `div1`. 

```html
<div id="div1">
  <p id="p1">This is a paragraph.</p>
  <p id="p2">This is another paragraph.</p>
</div>

<script>
const para = document.createElement("p");
const node = document.createTextNode("This is new.");
para.appendChild(node);

const element = document.getElementById("div1");
element.appendChild(para);
</script>
```

## Events

An event is something that is registered by the DOM, which can then execute some code. In other words, Javascript can "react" to "things" that happen. In base HTML and JS, this logic is specified within the element itself.

```html
<h1 onclick="this.innerHTML = 'Ooops!'">Click on this text!</h1>
```

This creates an h1 header element object that displays "Click on this text!" and that executes the JS code when a click event is registered. This event -> execute code principle is the primary logic by which websites using JS can be dynamic. However, what if you want to dynamically add an event handler to an object? You can do this too using the `addEventListener` method. 

```javascript
document.getElementById("myBtn").addEventListener("click", displayDate);
```

# References

<v-divider :thickness="5"></v-divider>

* W3schools.com. Introduction to HTML. https://www.w3schools.com/html/html_intro.asp 
* W3schools.com. Javascript HTML DOM. https://www.w3schools.com/js/js_htmldom.asp

