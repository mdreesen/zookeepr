const path = require('path');
const router = require('express').Router();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// the "/" brings us to the root route of the server.
// This is the route used to create a homepage for a server
router.get('/', (req, res) => {
    // res.sendFile() - this tells them where to find the file we want our server to read and send back to the client
    /* we are using the "path" to ensure that were finding the correct location for the HTML code we want to display in the browser
    This way, we know it will work in any server environment */
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

module.exports = router;