var express = require('express');
var http = require('http');
var fs = require('fs');
var ent = require('ent'); // Blocks HTML characters (security equivalent to htmlentities in PHP)

var app = express();
var server = http.createServer(app);

// Loading socket.io
var io = require('socket.io').listen(server);

//Loading the index.html page
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket, username){
    // When the username is received its stored as a session 
    // variable and informs other clients

    socket.on('new_client', function(username){
        username = ent.encode(username);
        socket.username = username;
        socket.broadcast.emit('new_client', username);
    });

    // When a username is received, the client's username is 
    // retrieved and sent to other clients

    socket.on('message', function(message){
        message = ent.encode(message);
        socket.broadcast.emit('message', {username: socket.username, message: message});
    });
});

server.listen(8080);