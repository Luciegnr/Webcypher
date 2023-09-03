const express = require("express");
const router = express.Router();
const controller = require("@controller/auth.controller");
const duplicate = require("@middleware/duplicate");

router.post("/signup", [duplicate.checkDuplicatePseudo, duplicate.checkDuplicateEmail], controller.signup);
router.post("/signin", controller.signin);

router.post("/user/:token", controller.checkEmail);
router.post("/sendtoken", controller.resendToken);
module.exports = router;
