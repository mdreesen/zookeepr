// Documentation to help write out an express server -> https://expressjs.com/en/4x/api.html
const express = require('express');

// To instantiate the server, this is all it takes to start the server
const app = express();
//////////////////////////////////////////////////////////////////////////////////////////////
const { animals } = require = ('./data/animals.json');

// The "get" method takes 2 arguments
app.get('/api/animals', (req, res) => {
    res.send('Hello!')
})

// this tells the dev that its running on the port number
app.listen(3001, () => {
    console.log(`API server now on port 3001!`)
})