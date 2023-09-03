const express = require("express");
const router = express.Router();
const auth = require("@middleware/auth");
const controller = require("@controller/avatar.controller");

router.post("/avatar", auth.Authenticate, controller.create);

router.get("/avatars", controller.getAll); 
router.get("/avatar/:id", controller.getOne);
router.get("/avatar", auth.Authenticate, controller.getCurrent);

router.delete("/avatar/:id", auth.isValidAvatar, controller.delete);
router.put("/avatar", auth.Authenticate, controller.update);

module.exports = router;
