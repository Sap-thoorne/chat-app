(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// We are Making a connection here

let socket = io.connect('https://10.0.2.15:8000');

// After connection is established has been established with the server
// 					, next proceeds


// Query DOM, these are the variables which store the data from the web,
//				given by user in the front end.

let output = document.getElementById('output'),
	handle = document.getElementById('handle'),
	message = document.getElementById('message'),
	btn = document.getElementById('send'),
	feedback = document.getElementById('feedback'),
	febk_kp = false;

// console.log(output, handle, message, btn);

// We need to emit events, the event must be run as per user's demand.

btn.addEventListener('click', function(){
	// This button send, passes the data on to the server from one of the client
	// It is done by using socket.emit function.
	// The type of function it needs to passon as well as the message object,
	// 		which stores the required content to be distributes to clients 
	// 				on that server.
	socket.emit('chat', {
		message : message.value,
		handle : handle.value
	});
	message.value = '';
});


// To get the typing effect, we need to send a message to server to broadcast
// 		it to all other users.
message.addEventListener('keypress', function(){
	if(!febk_kp){
		socket.emit('typing', handle.value);
	}
	febk_kp = true;
})

// Listening to the events which are sent by other clients on this server,
socket.on('chat', function(data){
	febk_kp = false;
	feedback.innerHTML = '';
	output.innerHTML += `<p><strong>${data.handle} : </strong>${data.message}</p>`;
});

socket.on('typing', function(data){
	feedback.innerHTML += `<p><em>${data} is typing.....</em></p>`;
});
},{}]},{},[1]);
