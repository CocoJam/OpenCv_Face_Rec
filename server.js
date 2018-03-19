// modules
var express = require('express')
  , http = require('http')

// configuration files

// app parameters
var app = express();
app.set('port', 8080);
app.use(express.static(__dirname));
console.log(__dirname)

// serve index
app.get('/', function (req, res) {
   res.sendFile('cam.html',{ root: __dirname });
 });
 app.get('/stream', function (req, res) {
    res.sendFile('streaming.html',{ root: __dirname });
  });
// HTTP server
var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('HTTP server listening on port ' + app.get('port'));
});

// WebSocket server
var io = require('socket.io')(server);
io.on('connection', require('./camsocket'));
io.on('stream',function(stream){
  socket.broadcast.emit("stream",stream)
});
io.on('frame', require('./camsocket'))

module.exports.app = app;
