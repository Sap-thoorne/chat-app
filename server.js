let express = require('express');
let https = require('https');
const fs = require('fs');
let app = express();
let socket = require('socket.io');


const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};
let server = https.createServer(options, app);

server.listen(process.env.PORT || 8000);

console.log(`${8000}`);

// app.get('/', function(req, res){
// 	res.sendFile(__dirname + '/public/index.html');
// });

// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));


let io = socket(server);

// Here we are creating a server for the chat to be made possible.


// This function is called as soon as the connection is established.
io.on('connection', function(socket){
	console.log('request is being listened.', socket.id);

	// Handle events

	//  Creating an event called chat to catch the clients input to other clients
	// 		via this server.
	socket.on('chat', function (data) {
		// io.sockets refers to all the connection related to the app on 
		//			that instance.
		io.sockets.emit('chat', data);
	});

	// Creating an event to tell other clients that one of them is typing
	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);
	});
});