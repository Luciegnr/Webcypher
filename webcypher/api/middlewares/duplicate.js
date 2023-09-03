const db = require("@model");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user && user._id != req.user_id) {
      res.status(400).send({ code: 400, message: "L'email est déjà utilisé" },);
      return;
    }
    next();
  });
};

checkDuplicatePseudo = (req, res, next) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user && user._id != req.user_id) {
      res.status(400).send({ code: 400, message: "Le nom d'utilisateur est déjà utilisé" });
      return;
    }
    next();
  });
};


const duplicate = {
  checkDuplicatePseudo,
  checkDuplicateEmail,
};

module.exports = duplicate;
