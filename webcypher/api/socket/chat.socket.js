const utils = require('../utils/socket-utils'); // Add this
// socket for live chat in room 
module.exports = function (io) {
    let chatRoom = '';
    let allUsers = [];
    io.on("connection", (socket) => {

        // On connection, we retrieve room_id and user_id and add the new user to the room's user list before sending it back to the connected users
        socket.on('join_room', (data) => {
            const { username, room } = data;
            socket.join(room);

            chatRoom = room;
            allUsers.push({ id: socket.id, username, room });
            chatRoomUsers = allUsers.filter((user) => user.room === room);
            io.in(room).emit('chatroom_users', { chatRoomUsers });
        });

        // function we call when a user sends a message, we retrieve the username, the room_id and the message and send it back to the connected users of the room in question
        socket.on('send_message', (data) => {
            const { room, username, senderId, message } = data;
            let __createdtime__ = Date.now();
            io.in(room).emit('receive_message', { room, username, senderId, message, __createdtime__ });
        });

        // function we call when a user leaves the room, we retrieve the room_id and remove the user from the room's user list before sending it back to the connected users
        socket.on('leave_room', (data) => {
            const { room } = data;
            socket.leave(room);
            chatRoomUsers = utils.leaveRoom(socket.id, allUsers);
            allUsers = chatRoomUsers;
            socket.to(room).emit('chatroom_users', { chatRoomUsers });
        });        
        socket.on('disconnect', () => {
            const user = allUsers.find((user) => user.id == socket.id);
            if (user?.username) {
                chatRoomUsers = utils.leaveRoom(socket.id, allUsers);
                allUsers = chatRoomUsers;
                socket.to(chatRoom).emit('chatroom_users', { chatRoomUsers });
            }
        });
    });
};