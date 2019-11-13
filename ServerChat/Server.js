//khởi tạo server
const express = require('express');
const uuidv1 = require('uuid/v1'); //to ensure userid is exclusive
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

//import hanler message 
const messageHanlder = require('./handlers/message.handler');

const users = {};

function createAvatar() {
	const width = Math.round(Math.random()* 200 + 100);
	const height = Math.round(Math.random()* 200 + 100);
	return `https://placeimg.com/${width}/${height}/any`;
}
function createOnlineUsers(){
	const onlineusers = Object.values(users); //get all online users
	const onlyUsersWithUserName = onlineusers.filter(user => user.username != undefined); //just get user has user name
	return onlyUsersWithUserName;
}
//tạo kết nối giữa client và server
io.on("connection", socket => {
	console.log("a user connected!" + socket.id);
	users[socket.id] = {userId: uuidv1()};
		//get event when user disconnect
	socket.on("disconnect",() => {
		delete users[socket.id];
		console.log('user disconnect');
		io.emit('action', {type: 'online_users', data: createOnlineUsers()});
	});

	socket.on('action', action => {
		switch(action.type){
			case 'server/join':
			console.log('Got join from event', action.data);
			users[socket.id].username = action.data;
			users[socket.id].avatar = createAvatar();
			io.emit('action', {type: 'online_users', data: createOnlineUsers()}); //emit all online users to the clients
			socket.emit('action', {type: 'self_user', data: users[socket.id]});
			break;
			case 'server/private_message':
			const conversationId = action.data.conversationId;
			const from = users[socket.id].userId;
			const userValues = Object.values(users);
			const socketIds = Object.keys(users);
			for (let i = 0; i < userValues.length; i++) {
				if (userValues[i].userId === conversationId) {
					const socketId = socketIds[i];
					io.sockets.sockets[socketId].emit('action', {
						type: 'private_message', 
						data: {
							...action.data,
							conversationId: from
						}
					});
					break;
				}
			}
			break;
		}
	})

	//get typing status when user typing
	socket.on("on-typing", typing => {
		console.log('typing...');
		io.emit("on-typing", typing);
	});


});
server.listen(port, ()=> console.log("server is running on port: " + port));