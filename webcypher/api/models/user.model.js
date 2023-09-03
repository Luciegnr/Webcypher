const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    status: {
      type: Boolean,
      default: false,
    },

    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },

    birthday: {
      type: Date,
    },

    country: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    role: {
      type: String,
    },
    avatar: [{ type: mongoose.Schema.Types.ObjectId, ref: "Avatar" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
