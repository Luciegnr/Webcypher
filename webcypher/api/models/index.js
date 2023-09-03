const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.audio = require("./audio.model.js");
db.token = require("./token.model.js")
db.user = require("./user.model");
db.avatar = require("./avatar.model");
db.room = require("./room.model");
db.conversation = require("./chat/conversation.model")
db.message = require("./chat/message.model")
module.exports = db;
