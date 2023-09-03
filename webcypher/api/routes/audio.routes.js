const express = require("express");
const router = express.Router();
const auth = require("@middleware/auth");
const storage = require('@middleware/upload.js')

const controller = require("@controller/audio.controller");
// const upload = storage.download.single('audio')

router.post("/room/:id/audio", auth.Authenticate, storage.download, controller.createFile);
router.post("/room/:id/link-audio", auth.Authenticate, controller.createLink);
router.post("/media", auth.Authenticate, storage.download, controller.createMedia);

router.get("/room/:id/audio", controller.getMediasRoom);
router.get("/room/file/:id", controller.getMediaRoom);
router.get("/room/audioUser", auth.Authenticate,  controller.getMediaUser);

router.put("/room/:id/update-media", auth.Authenticate, controller.modifyMediaRoom);
router.put("/room/:id/add-media/:items", auth.Authenticate, controller.modifyRoomMedia);

router.delete("/audio/:id", auth.Authenticate, controller.deleteAudio);
router.delete("/room/:idRoom/remove-media/:id", auth.Authenticate, controller.deleteAudioRoom);

module.exports = router;
