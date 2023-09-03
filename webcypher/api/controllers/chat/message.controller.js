const Message = require("@model/chat/message.model");

module.exports = {
    async create(req, res) {
        const { conversation_id, sender, text, receiver } = req.body.conversation_id;
        try {
            const newMessage = await Message.create({
                conversation_id: conversation_id,
                sender,
                text,
                receiver,
            });
            const savedMessage = await newMessage.save();
            res.status(200).json(savedMessage);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async delete(req, res) {
        const { id } = req.params;
        try {
            await Message.findByIdAndDelete(id).exec((err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({ message: "Message has been deleted" });
            });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async update(req, res) {
        try {
            console.log("UPDATE")
            await Message.updateMany({ conversation_id: req.params.conversation_id, sender: !req.params.sender }, { $set: { see: true } }).exec((err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
            });
            res.status(200).json({ message: "Message has been updated" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async get(req, res) {
        try {
            await Message.find({ conversation_id: req.params.id }).sort({ createdAt: 1 }).exec((err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json(result);
            });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};