const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        conversation_id: {
            type: String,
        },
        sender: {
            type: String,
        },
        receiver: {
            type: String,
        },
        text: {
            type: String,
        },
        see: {
            type: Boolean, default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
