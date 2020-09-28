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