const mongoose = require("mongoose");

const Room = mongoose.Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    author: {
      type: String,
    },
    source: {
      type: String,
    },
    tag: [{value: String, label: String}],
    items: [{}],
    metadata: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", Room);
