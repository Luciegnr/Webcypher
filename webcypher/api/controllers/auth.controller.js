const db = require("../models");
const User = db.user;
const Token = db.token;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const nodemailer = require("../config/mailer.config.js");

exports.signup = (req, res) => {
    const { username, email, password, firstname, lastname, birthday, country, phoneNumber, role } = req.body
    if (!username || !email || !password || !lastname || !firstname) {
        res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
        return;
    }
    const user = new User({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, 8),
        username, firstname, lastname, birthday, country, phoneNumber, role,
    });

    user.save((err, user) => {
        if (err) {
            res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
            return;
        }
        user.save((err) => {
            if (err) {
                res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
                return;
            }
            var code = jwt.sign(user.email, process.env.TOKEN_KEY)
            var token = new Token({ id_user: user._id, token: code, });
            token.save(async function (err) {
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }
                await nodemailer.signin(user.email, code)
            });

            res.status(201).send({
                id: user.id,
                username: user.username,
                created_at: user.createdAt,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                birthday: birthday,
                country: country,
                phoneNumber: phoneNumber,
            });
        });
    });
};

exports.signin = (req, res) => {
    const { password, username } = req.body
    if (!username || !password) {
        res.status(400).send({ message: "Bad Request", code: 400, data: "Missing username or password" });
        return;
    }
    User.findOne({ username: username }).exec((err, user) => {
        if (err) {
            res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
            return;
        }
        if (!user) {
            return res.status(400).send({
                message: "Bad Request",
                code: 400,
                data: "Nom d'utilisateur incorrect",
            });
        }
        var passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({ message: "Bad Request", code: 400, data: "Mot de passe incorrect", });
        }
        if (user.status != true) {
            return res.status(401).send({ message: "Bad Request", code: 401, data: "Vous n'avez pas encore validé votre email. Vérifiez vos mails et vos spam !" });
        }
        let data = {
            username: req.body.username,
            _id: user._id,
            email: user.email,
            role: user.role,
        };
        var token = jwt.sign(data, process.env.TOKEN_KEY, { expiresIn: "1500min" });
        res.status(200).send({
            token: token,
            id: user.id,
            username: user.username,
            created_at: user.createdAt,
            lastname: user.lastname,
            firstname: user.firstname,
            role: user.role,
            email: user.email,
        });
    });
};

exports.checkEmail = async (req, res) => {
    Token.findOne({ token: req.params.token }).exec((err, token) => {
        if (err) {
            res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
            return;
        }
        if (!token) {
            return res.status(400).send({
                message: "Bad Request",
                code: 400,
                data: "We were unable to find a valid token. Your token may have expired.",
            });
        }
        User.findOne({ _id: token.id_user }).exec((err, user) => {
            if (err) {
                res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
                return;
            }
            if (!user) {
                return res.status(400).send({
                    message: "Bad Request",
                    code: 400,
                    data: "We were unable to find a user for this token.",
                });
            }
            if (user.status) {
                return res.status(400).send({
                    message: "Bad Request",
                    code: 400,
                    data: "This user has already been verified.",
                });
            }
            user.status = true;
            user.save((err) => {
                if (err) {
                    res.status(400).send({ message: "Bad Request", code: 400, data: [err] });
                    return;
                }
                res.status(200).send({
                    success: true,
                });
            });
        });
    });
}

exports.resendToken = async (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user)
            return res.status(400).send({
                message: "Nous n'avons pas trouver d'utilisateur avec cette adresse e-mail.",
            });
        if (user.status)
            return res.status(400).send({
                message: "Ce compte a déjà été vérifié. Veuillez vous connecter.",
            });

        // Create a verification token, save it, and send email
        var code = jwt.sign(user.email, process.env.TOKEN_KEY)
        var token = new Token({ id_user: user._id, token: code });

        // Save the token
        token.save(function (err) {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }

            // Send the email
            nodemailer.signin(user.email, code);
            return res.status(200).send({
                message: "Un email de vérification a été envoyé à " + user.email + "."
            });
        });
    });
}