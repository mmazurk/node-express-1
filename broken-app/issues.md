# Broken App Issues

* app should be declared as a const and not a var;

* 'app.listen()' needs to be moved into a server.js file so we can use jest and supertest libraries. Also, we should add some feeback for the developer that the app is running using console.log().

* If there is an error, it's passed to the next app.use() function in the middelware stack with the proper parameter siganture, but one doesn't exist. Even if the error is handled, there is no class to deal with it, so I created one called 'expressError.js' that can handle and report errors.

* There is no 404 handler if the user enters an incorrect URL. This was added as middleware if a request cannot be matched to a route.

* We have no middleware to handle json requests, so this was added

* There is a wayward 'return' before the axios.get() function; this was removed

* The way async is used in the anonymous arrow function is incorrect because map function will not wait for the promises to resolve and therefore will create an array of promises. To resolve those promises, we need await before the axios call and Promise.all(). We are basically doing this:

    // Create an array of promises
    let promises = req.body.developers.map(d => axios.get(`https://api.github.com/users/${d}`));

    // Resolve all promises
    let responses = await Promise.all(promises);

    // Extract data from responses
    let results = responses.map(response => response.data);

* Ideally we would want to create a app.test.js file for this.

* I added err to catch()

* I also needed to:

    npm init --yes
    npm install express
    npm install axios






