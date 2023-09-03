require('module-alias/register')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();

const server = http.createServer(app);

// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cors({ credentials: false, origin: '*' }));


const io = require('socket.io')(server.listen(4000), {
  cors: {
    origin: "*",
  }
});

require('./socket/audio.socket')(io)
require('./socket/chat.socket')(io);
require('./socket/private.chat.socket')(io);


global.__basedir = __dirname;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// mongoose.connect("mongodb://127.0.0.1:27017/pli", clientOptions);


const URI =
  "mongodb+srv://webcypher:webcypher@webcypher.bvyfct2.mongodb.net/webcypher";

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", require("./routes/index.js"));

app.get("*", function (req, res) {
  res.status(404).json({
    message: "Not found",
  });
});

module.exports = app;
