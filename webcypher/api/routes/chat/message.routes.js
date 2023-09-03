const express = require("express");
const router = express.Router();
const middleware = require("@middleware/auth");
const controller = require("@controller/chat/message.controller.js");


router.post("/messages", middleware.Authenticate, controller.create);
router.get("/message/:id", middleware.Authenticate, controller.get)
router.put("/message/:conversation_id/:sender", middleware.Authenticate, controller.update);
router.delete("/message/:id", middleware.Authenticate, controller.delete);

module.exports = router;
