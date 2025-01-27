---
title: "Intro to Javascript"
topic: "Computer Science"
path: "into-to-javascript"
author: "David Lu"
date: "2024-11-11"
preview: "Just a few notes I took on the basics of Javascript as part of my process for building this website."
---


Originally, JS was developed to run only in the browser. Programs like Chrome and Firefox all have the ability to execute JS code. That is, until Node.JS came along. Node.JS was basically a C++ wrapper around Chrome's core V8 javascript runtime. But now as long as you have Node.JS installed on your machine, you can execute JS. This is primarily used on server-side services, but it enables full-stack applications to be written now in a single language. 

# Using Javascript in HTML

<v-divider></v-divider>

As a language designed to run in browsers, we can integrate it into `.html` files. 

```html
<script>
    console.log("Hello World");
</script>

<script src="index.js">
</script>
```

# Javascript Syntax

<v-divider></v-divider>

## Variables

Javascript is a dynamically-typed language. Primitive types are String, Number, and Boolean. There are also Reference types including Objects, Arrays, and Functions.

``` javascript
let name = 'David';     // String Literal
let ID = 'D-0003';

const gravity = 9.81;   // Number Literal
let approval = true;    // Boolean Literal

typeof name
> "string"
```

To create an object, follow a syntax like a python dictionary. 

```javascript
let person = {
    name: 'David',
    age: '28'
};

console.log(person.name)
console.log(person['name'])
```

Arrays are created in a similar fashion, and are zero-indexed. Like python, they are also dynamic.

```javascript
let colors = ['red', 'blue']
colors[2] = 'green'
```

## Functions

Function declaration is pretty straightforward as well, follows much the same syntax as in python. 

```javascript
function greet(name){
    console.log('Hello ' + name);
    return true
}

greet('John')
```

If a function argument is not passed to the function call, it defaults to the `undefined` variable type. 


## Asynchronous Functions

Asynchronous functions in JavaScript, defined using the async keyword, allow for non-blocking code execution by returning `Promise` objects that can be resolved or rejected at a later time. They are primarily used to handle operations like data fetching, file I/O, and timers, enabling smoother, more efficient, and responsive applications.

> A promise is a placeholder for a result that will be available in the future. A promise exists in the pending state, and then will resolve either into resolved or rejected.

Putting the `async` tag in front of a function makes it return a promise. You can then place an `await` keyword within that function to execute on the result of that promise. Note that an await can *only* exist within an async function. 

When an async function gets called, it will continue to run in the background while the rest of your code proceeds on. 

```javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true; 
            
            if (success) {
                resolve("Data fetched successfully!"); 
            } else {
                reject("Error: Failed to fetch data."); 
            }
        }, 2000); // Simulate a 2-second delay
    });
}
```

If we call this function `fetchData`, it waits for the promise to be fulfilled and then executes a response repending on the result. 

```javascript
fetchData()
    .then((message) => {
        console.log(message); // Logs "Data fetched successfully!" if resolved
    })
    .catch((error) => {
        console.error(error); // Logs "Error: Failed to fetch data." if rejected
    });
```
# Typescript

TypeScript is a statically typed superset of JavaScript that adds optional type checking and other features to enhance code quality and maintainability. Developed by Microsoft, it compiles to plain JavaScript, ensuring compatibility with all JavaScript environments.


## Creating Variables

As a statically typed language, each Typescript variable has a type, and cannot be re-typed into something else. You can declare types explicitly, or implicitly.

```typescript
let firstName: string = "Dylan";
let lastName = "Smith";

firstName = 33 // This throws an error
lastName = 22  // This also throws an error
```

At your own risk, you can get around type checking by declaring a variable to be of type `any`. 

Arrays are declared with a type too:

```typescript
const names: string[] = [];
```

