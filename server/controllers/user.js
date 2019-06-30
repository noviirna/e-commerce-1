const User = require(`../models/user`);
const { comparePassword } = require(`../helpers/password`);
const { generateToken } = require(`../helpers/token`);
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.GOOGLE_EMAIL}`,
    pass: `${process.env.GOOGLE_PASS}`
  }
});

class ControllerUser {
  static register(req, res, next) {
    User.create(req.body)
      .then(created => {
        const emailCont = `
        <h3>Thanks for joining lux jewelries ${created.name}!</h3>
        <p>
        Happy shopping! <b>"${created.name}"</b>
        </p>
        <p>If you had any issues in regards of your purchase, you can contact us to this email!</p>
        `;

        const mailOptions = {
          from: "info@luxjewelries.com", // sender address
          to: `${created.email}`, // list of receivers
          subject: "Thanks for joining lux jewelries!", // Subject line
          html: emailCont
        };

        return transporter.sendMail(mailOptions).then(sent => {
          res.status(201).json(created);
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    if (
      !req.body.password ||
      !req.body.email ||
      req.body.password == "" ||
      req.body.email == ""
    ) {
      next({ code: 400, message: `Complete the log in form` });
    } else {
      User.findOne({ email: req.body.email })
        .then(found => {
          if (found) {
            let { _id, email, name, picture, password } = found;
            if (comparePassword(req.body.password, password) === true) {
              let user = { _id, email, name, picture };
              let token = generateToken(user);
              res.status(200).json({ token, user });
            } else {
              next({ code: 400, message: `Password / Email is wrong` });
            }
          } else {
            next({ code: 400, message: `Password / Email is wrong` });
          }
        })
        .catch(next);
    }
  }
}

module.exports = ControllerUser;
