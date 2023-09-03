const db = require("@model");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");
const Avatar = db.avatar;

// Check if token and if is valid then return user_id
Authenticate = async (req, res, next) => {
  if (req.get("Authorization")) {
    var authHeader = req.get("Authorization");
    authHeader = authHeader.replace("Bearer ", "");
    if (authHeader == null) {
      res.send({ status: 401, message: "authorization missing" });
    }
    jwt.verify(authHeader, process.env.TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        res.send({ status: 403, message: err.message });
      } else {
        req.username = decodedToken.username;
        req.user_id = decodedToken._id;
        return next();
      }
      return next();
    });
  } else {
    return res.status(401).json({ message: "Error. Need a token !" });
  }
};

AuthenticateWithId = async (req, res, next) => {
  // Présence d'un token
  if (req.get("Authorization")) {
    const token = req.get("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Error. Need a token" });
    }

    // Véracité du token
    jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Error bad token", err: err });
      } else {
        if (decodedToken._id !== req.params.id) {
          res.status(401).json({ message: "unauthorized" });
        } else {
          req.user_id = decodedToken._id;
          return next();
        }
      }
    });
  } else {
    return res.status(401).json({ message: "Error. Need a token" });
  }
};


isValidAvatar = async (req, res, next) => {
  let id = req.params.id;
  let avatar;
  if (isValidObjectId(id) === true) {
    avatar = await Avatar.findById(id);
  }

  if (avatar) {
    if (req.get("Authorization")) {
      let token = req.get("Authorization").replace("Bearer ", "");
      jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Error token invalid", err: err });
        } else {
          const avatar = await Avatar.findOne({ _id: req.params.id });

          if (avatar.id_user != decodedToken._id) {
            res.status(401).json({ message: "unauthorized" });
          } else {
            req.user_id = decodedToken._id;
            return next();
          }
        }
      }).catch((err) => {
        res.status(500).json({ message: "Error bad token", err: err });
      });
    } else {
      return res.status(401).json({ message: "Error. Need a token" });
    }
  } else {
    return res.status(404).json({ message: "Video not found" });
  }
};

const auth = {
  isValidAvatar,
  Authenticate,
  AuthenticateWithId,
};

module.exports = auth;
