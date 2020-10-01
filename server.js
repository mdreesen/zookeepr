// Documentation to help write out an express server -> https://expressjs.com/en/4x/api.html
// -=- how to validate data, you can use 3rd party's to do so
// - express validator can validate data

const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

// To instantiate the server, this is all it takes to start the server
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// this is added middleware to our server and used the express.status() method
// we provide a file path to a location in our application (the public folder) and instruct the server to make these files static resources
// this means that all of our front end code can now be accessed without having a specific server endpoint created for it
app.use(express.static('public'));

// -=- NEED TO PARSE THE DATA FOR POST CALLS -=-
// parse incoming string or array data
// This is called Middleware functions
// this method is built into express, takes POST method and converts it to key/value pairings
// the extended: true inmors our server that there may be sub-array data nested in it as well
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
// the express.json takes incoming POST data in the form of JSON and parses it into the req.body JS object
app.use(express.json());

// This is our way of telling the server that any time a client navigates to {URL}/api, 
// the app will use the router we set up in "apiRoutes"
// If '/' is the endpoint, then the router will serve back our HTML routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
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

// this tells the dev that its running on the port number
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});