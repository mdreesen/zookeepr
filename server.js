// Documentation to help write out an express server -> https://expressjs.com/en/4x/api.html
const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

// To instantiate the server, this is all it takes to start the server
const app = express();

// -=- NEED TO PARSE THE DATA FOR POST CALLS -=-
// parse incoming string or array data
// This is called Middleware functions
// this method is built into express, takes POST method and converts it to key/value pairings
// the extended: true inmors our server that there may be sub-array data nested in it as well
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
// the express.json takes incoming POST data in the form of JSON and parses it into the req.body JS object
app.use(express.json());
//////////////////////////////////////////////////////////////////////////////////////////////
const { animals } = require('./data/animals.json');
/*
// The "get" method requires 2 arguments
// 1st is a string that describes the route the client will have to fetch from
// 2nd function that will execute every time that route is addressed with a GET request
// We are also using the send() method from the "res" parameter (short of response) to send the string 'Hello!' to our client
app.get('/api/animals', (req, res) => {
    res.send('Hello!')
});
*/
/*
// Filter Strings
function filterByQuery(query, animalsArray) {
    let filteredResults = animalsArray;
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species)
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }
    return filteredResults;
}
*/

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            /*Check the trait against each animal in the filteredResults array.
             Remember, it is initially a copy of the animalsArray,
             but here we're updating it for each trait in the .forEach() loop.
             For each trait being targeted by the filter, the filteredResults
             array will then contain only the entries that contain the trait,
             so at the end we'll have an array of animals that have every one 
             of the traits when the .forEach() loop is finished. */
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
};

// Making sure that this data needs to be there 
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

// We are passing req.params.id into this function
// this block is getting just a single ID back (unique ID), that is why we dont need other code
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

// created a function that accepts the POST route's req.body value and the arry we want to add the data to.
// this will be the animalsArray, because the function is for adding a new animal to the catalog
function createNewAnimal(body, animalsArray) {
    const animal = body;
    // used .push() to save the new data in this local server.js copy of our animal data
    animalsArray.push(animal);
    // writeFileSync is a synchronous method of fs.writeFile()
    // This does not require a callback function. If we were writing a much larger dataset, the asynchronous version would be better
    fs.writeFileSync(
        /* We want to write to our animals.json file in the data subdirectory, so we use the method path.join()
         to join the value of __dirname, which represents the directory of the file we execute the code in
         with the path to the animals.json file. */
        path.join(__dirname, './data/animals.json'),
        // we need to save the javascript array data as JSON. We use JSON.stringify() to convert it.
        // the other two arguments used in the method (null and 2) are means of keeping out data formatted.
        // Null argument means we dont want to edit any of our existing data (if we did we could pass something in there)
        // the 2 indicates we want to create white space between our our values to make it more readable
        // If we were to leave these arguments out, the entire file would work, but it would be hard to read
        JSON.stringify({ animals: animalsArray }, null, 2));

    // return finished code to post route for response
    return animal;
}


// -=- we have to pay attention to the order of the routes -=-
// the param route must come after th other get route
app.get('/api/animals', (req, res) => {
    // making animals a variable
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    // takes the query param and turns it into JSON
    // console.log(req.query)
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// Creation of the post route
// with POST requests, we can package up data
app.post('/api/animals', (req, res) => {
    // req.body is where our incoming content will go
    // console.log(req.body);

    // set id based on what the next index of the arry will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        // res.status().send() is a response method to relay a message to the client making the request.
        // We send the an HTTP status code and a message explaining what went wrong
        // anything in the 400's means that it's a user error and not a server error, with the message
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // add animal to json file and animals arry in this function
        const animal = createNewAnimal(req.body, animals);
        res.json(animal)
    }
});

// -=- how to validate data, you can use 3rd party's to do so
// - express validator can validate data


// this tells the dev that its running on the port number
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});