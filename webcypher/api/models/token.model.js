const mongoose = require("mongoose");

const Token = mongoose.Schema(
    {
        id_user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        token: { type: String, required: true },
        expireAt: { type: Date, default: Date.now, index: { expires: 3000 } }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Token", Token);
