const mongoose = require("mongoose");

const Avatar = mongoose.Schema(
    {
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        ShirtStyle: {
            type: String,
        },
        NoseStyle: {
            type: String,
        },
        MouthStyle: {
            type: String,
        },
        HatStyle: {
            type: String,
        },
        GlassesStyle: {
            type: String,
        },
        HairStyle: {
            type: String,
        },
        FaceColor: {
            type: String,
        },
        EyesStyle: {
            type: String,
        },
        EarStyle: {
            type: String,
        },
        BgColor: {
            type: String,
        },
        HairColor: {
            type: String,
        },
        HatColor: {
            type: String,
        },
        Shape: {
            type: String,
        },
        ShirtColor: {
            type: String,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Avatar", Avatar);
