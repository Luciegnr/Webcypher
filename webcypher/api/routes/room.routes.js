const express = require("express");
const router = express.Router();
const auth = require("@middleware/auth");
const controller = require("@controller/room.controller");
const uploadFile = require("@middleware/upload");
const fUpload = uploadFile.upload.single("source");
require("dotenv").config();

router.post("/room", auth.Authenticate, fUpload, controller.create);

router.get("/rooms", controller.getAll);
router.get("/room/:id", controller.getOne);
router.get("/rooms/:filename", controller.getCover);

router.delete("/room/:id", controller.delete);
router.put("/room", controller.update);

module.exports = router;
