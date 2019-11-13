let currentMessageId = 1;
//create a object Gifted Chat message
function createMessage(user, textMess) {
	return {
        _id: currentMessageId++,
        text: textMess,
        createdAt: new Date(),
        user: {
          _id: user.userId,
          name: user.username,
          avatar: user.avatar,
        }
   	};
}
function handleMessage(socket, users){
    //send message to all client except sender
  socket.on("chat-message",textMessage => {
    const user = users[socket.id];
    const message = createMessage(user, textMessage);
    console.log(message);
    socket.broadcast.emit('chat-message',message);
  });
}
module.exports = {handleMessage};