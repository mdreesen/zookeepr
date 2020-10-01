const fs = require('fs');
const path = require('path');

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
        path.join(__dirname, '../data/animals.json'),
        // we need to save the javascript array data as JSON. We use JSON.stringify() to convert it.
        // the other two arguments used in the method (null and 2) are means of keeping out data formatted.
        // Null argument means we dont want to edit any of our existing data (if we did we could pass something in there)
        // the 2 indicates we want to create white space between our our values to make it more readable
        // If we were to leave these arguments out, the entire file would work, but it would be hard to read
        JSON.stringify({ animals: animalsArray }, null, 2));

    // return finished code to post route for response
    return animal;
};

module.exports = {
    filterByQuery,
    validateAnimal,
    findById,
    createNewAnimal
};