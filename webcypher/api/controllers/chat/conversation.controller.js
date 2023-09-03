const Avatar = require("@model/avatar.model");
const Conversation = require("@model/chat/conversation.model");
const User = require("@model/user.model");
const Message = require("@model/chat/message.model");

module.exports = {
    // Create conv document between two users
    async create(req, res) {
        const sender_id = req.user_id;
        const receiver_id = req.params.receiverId;
        const user = await User.findOne({ _id: receiver_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        try {
            const newConversation = await Conversation.create({
                users: [{ id: sender_id, username: req.username }, { id: receiver_id, username: user.username }],
            });
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get all conversations with user id of current user
    async getUserConversations(req, res) {
        try {
            const conversation = await Conversation.find({ "users.id": { $in: [req.user_id] } }).sort({ updatedAt: -1 });
            for (const conv of conversation) {
                const other = conv.users.find((user) => user.id !== req.user_id);

                if (conv.users._id == req.user_id) {
                    conv.users.unread = 0;
                }
                else {
                    for (const u of conv.users) {
                        const msgs = await Message.find({
                            conversation_id: conv._id,
                            sender: other.id,
                            receiver: req.user_id,
                            see: false
                        });
                        if (u["id"] == req.user_id) {
                            u["avatar"] = null;
                        } else {
                            const avatar = await Avatar.findOne({ id_user: u["id"] });
                            u["avatar"] = avatar;
                        }
                        u["unread"] = msgs.length
                    }
                }
            }
            res.status(200).json(conversation);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // return conversation by id
    async getOne(req, res) {
        try {
            await Conversation.findById(req.params.id).exec((err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json(result);
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // check if conversation exist between two users
    async getOneTwoUser(req, res) {
        try {
            await Conversation.findOne({ "users.id": { $all: [req.user_id, req.params.user_two] } }).exec((err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json(result);
            });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
};