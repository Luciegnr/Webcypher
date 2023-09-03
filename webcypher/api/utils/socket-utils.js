const jwt = require("jsonwebtoken");

function leaveRoom(userID, chatRoomUsers) {
    return chatRoomUsers.filter((user) => user.id != userID);
}

function getIdFromToken(token) {
    let id = ''
    jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => { id = decodedToken._id; });
    return id;
};

function addUser(users, userId, socketId) {
    return !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

function removeUser(users, socketId) {
    return users = users.filter((user) => user.socketId !== socketId);
};

function getUser(users, userId) {
    return Promise.resolve(users.find((user) => user.userId === userId));
};

module.exports = { leaveRoom, getIdFromToken, addUser, removeUser, getUser };
