const express = require("express");
const router = express.Router();
const middleware = require("@middleware/auth");
const controller = require("@controller/chat/conversation.controller.js");


router.post("/conversation/:receiverId", middleware.Authenticate, controller.create);
router.get("/conversation", middleware.Authenticate, controller.getUserConversations)
router.get("/conversation/:id", middleware.Authenticate, controller.getOne)
router.get("/conversation-check/:user_two", middleware.Authenticate, controller.getOneTwoUser)
module.exports = router;
