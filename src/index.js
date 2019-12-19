//Obtain server from file server.js
const server = require('./server').server;
const port = 4000;

//Listen to server
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})