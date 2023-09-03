const mongoose = require("mongoose");
const Audio = mongoose.Schema(
    {
        id_user: String,
        name: String,
        path: String,
        id: String,
    },
    { timestamps: true }
);
module.exports = mongoose.model("Audio", Audio);