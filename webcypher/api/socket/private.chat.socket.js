const conversationModel = require("@model/chat/conversation.model");
const conversationController = require("@controller/chat/conversation.controller");
const messageModel = require("@model/chat/message.model");
const userModel = require("@model/user.model");
const utils = require('../utils/socket-utils'); // Add this


module.exports = function (io) {

    let activeUsers = [];

    io.on("connection", (socket) => {
        socket.on("new-user-add", (newUserId) => {
            console.log("====================================")
            console.log(newUserId)
            console.log(activeUsers)
            if (newUserId && !activeUsers.some((user) => user.userId === newUserId)) {
                activeUsers.push({ userId: newUserId, socketId: socket.id });
                console.log("New User Connected", activeUsers);
            }
            console.log("====================================")
            io.emit("get-users", activeUsers);
        });

        socket.on("disconnect", () => {
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
            console.log("User Disconnected", activeUsers);
            io.emit("get-users", activeUsers);
        });

        // send message to a specific user
        socket.on("send-message", async (data) => {
            const { receiver, sender } = data.data;
            const user = activeUsers.find((user) => user.userId === receiver);
            if (user) {
                io.to(user.socketId).emit("recieve-message", data.data);
            }

            let receiver_user = await userModel.findOne({ _id: receiver });
            let sender_user = await userModel.findOne({ _id: sender });
            io.emit("receiveMessage", {
                receiver: receiver_user,
                sender: sender_user,
                messages: "messages",
            });

        });

        // update to seen message to specific user and  specific conversation
        socket.on("update-seen-message", async (data) => {
            const { conversation_id, receiver_id } = data;
            console.log("update-seen-message", data);
            const user = activeUsers.find((user) => user.userId === receiver_id);
            if (user) {
                io.to(user.socketId).emit("update-seen-message", data);
            }
            const messages = await messageModel.find({ conversation_id: conversation_id });
            const unreadMessages = messages.filter(
                (message) => message.see === false
            );
            if (unreadMessages.length > 0) {
                const messageIds = unreadMessages.map((message) => message._id);
                await messageModel.updateMany(
                    { _id: { $in: messageIds } },
                    { $set: { see: true } }
                );
            }

        });
    });
};
