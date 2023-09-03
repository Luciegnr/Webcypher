const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");


exports.getOne = async (req, res) => {
  const id = req.params.id;
  User.findById(id).then((data) => {
    if (!data) res.status(404).send({ message: "Not found" });
    else
      res.status(200).send({
        username: data.username,
        email: data.email.toLowerCase(),
        firstname: data.firstname,
        lastname: data.lastname,
        role: data.role,
      });
  }).catch((err) => {
    res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
  });
};

exports.getCurrent = async (req, res) => {
  await User.findById({ _id: req.user_id }).then((data) => {
    if (!data) {
      res.status(404).send({ message: "data not found" });
    } else
      res.status(200).send({ data: data });
  }).catch((err) => {
    res.status(400).send({
      message: "Bad Request",
      code: 400,
      data: [err],
    });
  });
};

exports.getExceptCurrent = async (req, res) => {
  notreturnId = req.user_id;
  await User.find({ _id: { $ne: notreturnId } }).populate('avatar').exec().then((data) => {
    if (!data) res.status(404).send({ message: "Not found" });
    else
      res.status(200).send({
        data: data,
      });
  });
};

exports.update = (req, res) => {
  const id = req.user_id;
  const { password, username, email, firstname, lastname, role, country, phoneNumber, birthday } = req.body;
  var user = {};
  if (password) {
    user = {
      username, email, firstname, lastname, role, country, phoneNumber, birthday,
      password: bcrypt.hashSync(password, 8),

    };
  } else {
    user = {
      username, email, firstname, lastname, role, country, phoneNumber, birthday
    };
  }
  User.findByIdAndUpdate(id, user, { useFindAndModify: false }).then((data) => {
    if (!data) {
      res.status(404).send({ message: `Not found` });
    } else
      res.status(200).send({
        id: data._id,
        username: req.body.username || data.username,
        created_at: data.createdAt,
        email: req.body.email || data.email,
        firstname: req.body.firstname || data.firstname,
        lastname: req.body.lastname || data.lastname,
        role: req.body.role || data.role,
      });
  }).catch((err) => {
    res.status(400).send({ succes: false });
  });
};

exports.delete = async (req, res) => {
  const id = req.user_id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).send({ message: "Not found" });
  }
  try {
    await User.findByIdAndDelete(id);
    return res.status(204).send({ message: "OK" });
  } catch (e) {
    res.status(400).json({ message: "Bad Request", code: 400, data: [e] });
  }
};