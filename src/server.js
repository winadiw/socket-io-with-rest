const path = require('path')
const socketio = require('socket.io')
const http = require('http')
const express = require('express')

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const staticRoom = '123321';

//Handle Socket.IO connections
io.on('connection', (socket) => {
    socket.join(staticRoom)
    socket.on('foo', (data) => {
        console.log(data)
    })
})

//Add JSON to RESTful API
app.use(express.json())

//Embed io to res variable
app.use(function(req, res, next){
    res.io = io;
    next();
});

//On POST request, emit to certain room/client
app.post('/newData', (req, res) => {
    res.io.to(staticRoom).emit('bar', 123321)
    return res.status(200).send()
})

//For serving up example from public directory to index.html
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

module.exports = {
    app, 
    server
};