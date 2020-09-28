const { query } = require('express');
// Documentation to help write out an express server -> https://expressjs.com/en/4x/api.html
const express = require('express');

// To instantiate the server, this is all it takes to start the server
const app = express();
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
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
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
}

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

// this tells the dev that its running on the port number
app.listen(3001, () => {
    console.log(`API server now on port 3001!`)
})