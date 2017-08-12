var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');
var io = require('socket.io')(http);
var connections = 0;
var posx = [];
var posy = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/snake', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/libraries/p5.js', function(req, res){
    res.sendFile(__dirname + '/libraries/p5.js');
});

app.get('/p5js-temp-Snake85809877404288079.js', function(req, res){
    res.sendFile(__dirname + '/Snake.js');
});


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})


//io handles
io.on('connection', function(socket){
    console.log('a user connected' + socket.handshake.address.address);
    socket.con = connections;
    connections++;
    posx.push(20);
    posy.push(20);
    socket.emit('startup', connections, posx, posy);

    socket.broadcast.emit('newcon');

    setInterval(function() {
        io.emit('update',posx,posy);
    }, 100);

    socket.on('pos', function(posxs, posys, c){
        posx[c] = posxs;
        posy[c] = posys;
    });

    socket.on('disconnect', function(){
        posx[socket.con] = 500;
    });
});

http.listen(80, function(){
    console.log('listening');
});