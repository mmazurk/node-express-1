### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

You can embed a callback function after an asynchronous operation -- such as fs.readFile() -- and then call the callback to so something with the resulting output.

You can also use Promises, which execute asynchronously and are either resolved or rejected. Typically this is done with "promise chaining".

Lastly, you can use async functions (with await) which automatically generate promises and pause execution within the function until the promise is out of "pending" mode. 

- What is a Promise?

A Promise is an action on hold until it returns an object with three potential states: pending, resolved, and rejected. You can create your own promises that have two required callbacks (resolve, reject).

- What are the differences between an async function and a regular function?

An async function allows you to perform an asynchronous action within the function and "await" it until the action is either resolved or rejected. It looks like synchronous code but it's actually asynchronous. 

- What is the difference between Node.js and Express.js?

Node.js is a library that allows you to write server-side javascript. Express.js is a framework that allows you to create a web server that can process HTTP requests. 

- What is the error-first callback pattern?

This is when a callback function is passed as an argument to an asynchronous function. This callback function is used once the asynchronous operation completes, either with an error or a result.

- What is middleware?

Middleware are functions in Express.js -- typically app.use() -- that are executed between every request and response. They are executed in order they are written, and they must include a next() callback to proceed to the next middleware in the stack, or to handle an error.  

- What does the `next` function do?

The next() callback function passes control to the next middleware function in the middleware stack. 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

In terms of performance, you are doing sequential await calls, which will be a problem at scale due to waiting for each to complete. To solve this you could do them all at the same time. For structure, you probably want to declare a variable called baseURL = 'https://api.github.com/' to prevent typing errors and/or bugs. For naming, I would rename the const variables to "user1", "user2", "user3". 

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
