const express = require("express");
const router = express.Router();
const controller = require("@controller/user.controller");
const auth = require("@middleware/auth");
const duplicate = require("@middleware/duplicate");
const { body } = require("express-validator");


router.get("/users", auth.Authenticate, controller.getExceptCurrent);
router.get("/user", auth.Authenticate, controller.getCurrent);
router.get("/user/:id", controller.getOne);

router.put("/user", [auth.Authenticate, duplicate.checkDuplicateEmail, duplicate.checkDuplicatePseudo,], [body("pseudo").isString().optional().matches(/^[a-zA-Z0-9_-]+$/, "g").withMessage("username not valid"), body("email").isEmail().optional().withMessage("email not valid"),], controller.update);
router.delete("/user/:id", auth.AuthenticateWithId, controller.delete);

module.exports = router;
