// We cannot use app in the routes anymore, its only declared in server.js. 
// We use the router to route these to express
const router = require('express').Router();

// We have to import the functions here
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals.json')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// -=- we have to pay attention to the order of the routes -=-
// the param route must come after th other get route
router.get('/animals', (req, res) => {
    // making animals a variable
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    // takes the query param and turns it into JSON
    // console.log(req.query)
    res.json(results);
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// NOTE: for GET and POST requests, you can use the same endpoints

// Creation of the post route
// with POST requests, we can package up data
router.post('/animals', (req, res) => {
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

module.exports = router;