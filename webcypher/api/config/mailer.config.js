require("dotenv").config();
const nodemailer = require("nodemailer");
const config = require("./auth.mailer.config");
const template = require("./attachments/email.js");
const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.signin = async (email, code) => {
  transport
    .sendMail({
      to: email,
      subject: "Confirmation d'email",
      attachments: [
        {
          filename: "header.png",
          path: __dirname + "/attachments/header.png",
          cid: "header",
        },
      ],
      html: template.email(code),

    })
    .catch((err) => console.log(err));
};
