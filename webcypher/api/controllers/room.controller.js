const db = require("../models");
const Room = db.room;
const User = db.user;
const uploadFile = require("@middleware/upload");

exports.create = async (req, res) => {
  const user_id = req.user_id;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    await Room.findOne({ id_user: user_id }).then(async (data) => {
      if (data) {
        return res.status(400).json({ message: "Vous avez déjà une room en cours" });
      } else {
        var tags = JSON.parse("[" + req.body.tag + "]")
        const room = new Room({
          name: req.body.name,
          tag: tags[0],
          author: user.username,
          id_user: user_id,
          source: req.file.path,
        });
        await room.save();
        return res.status(201).json({
          message: "Votre room à bien été crée"
        });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  await Room.find().then((data) => {
    if (!data) res.status(404).send({ message: "Not found" });
    else
      res.status(200).send({
        data: data,
      });
  });
};
 
exports.getOne = async (req, res) => {
  const id = req.params.id;
  await Room.findOne({ _id: id }).then((data) => {
    if (!data) res.status(404).send({ message: "Not found" });
    else
      res.status(200).send({ data: data });
  }).catch((err) => {
    res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
  });
};

exports.getCover = async (req, res) => {
  uploadFile.bucket.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ err: "no files exist" });
    }
    uploadFile.bucket.openDownloadStreamByName(req.params.filename).pipe(res);
  });
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Room.findByIdAndDelete(id).then(async (data) => {
      if (!data) {
        res.status(404).send({ message: "Not found" });
      }
      else {
        res.status(200).send({ message: "Deleted Successfully" });
      }
    }).catch((err) => {
      res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
    });
  } catch (error) {
    res.status(400).json({ message: "Bad Request", code: 400, data: [error] });
  }
};

exports.update = async (req, res) => {
  const id = req.user_id;
  const { name, author } = req.body;
  try {
    await Room.findOneAndUpdate({ id_user: id }, { name: name, author: author }).then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found" });
      } else res.status(200).send({ message: "Updated Successfully" });
    }).catch((err) => {
      res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
    });
  } catch (error) {
    res.status(400).json({ message: "Bad Request", code: 400, data: [error] });
  }
};

