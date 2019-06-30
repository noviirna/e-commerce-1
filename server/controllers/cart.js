const Cart = require(`../models/cart`);

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.GOOGLE_EMAIL}`,
    pass: `${process.env.GOOGLE_PASS}`
  }
});

class ControllerCart {
  static create(req, res, next) {
    Cart.create(req.body)
      .then(created => {
        const emailCont = `
        <h3>Thanks for you for shopping ${req.user.name}!</h3>
        <p>
        Below are the details of the transaction that you need to pay <b>"${
          req.user.name
        }"</b>
        </p>
        <p>
        Total that you have to paid : ${created.total}.  
        Products purchased : ${created.products.length} item. 
        You can paid your purchase through transfer to our Bank account via Mandiri 1234567890 (Lux Jewelries) or BCA 1234567890 (Lux Jewelries)
        We will wait for 3 x 24 h for you to paid your purchase, if you not paid the purchase throughout that time, we consider you have cancelled the purchase
        For details of your purchase, go to your account and look at transaction history.
        </p>
        <p>Thank you for choosing us!</p>
        <p>If you had any issues in regards of your purchase, you can contact us to this email!</p>
        `;

        const mailOptions = {
          from: "info@luxjewelries.com", // sender address
          to: `${req.user.email}`, // list of receivers
          subject: `Your transaction today at Lux Jewelries ${req.user.name}!`, // Subject line
          html: emailCont
        };

        transporter
          .sendMail(mailOptions)
          .then(sent => {
            res.status(201).json(created);
          })
          .catch(next);
      })
      .catch(next);
  }

  static delete(req, res, next) {
    Cart.findByIdAndDelete(req.params.id)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(next);
  }

  static detail(req, res, next) {
    Cart.findById(req.params.id)
      .then(found => {
        if (found) {
          res.status(200).json(found);
        } else {
          res.status(400).json({ message: `that is not exists` });
        }
      })
      .catch(next);
  }

  static user(req, res, next) {
    Cart.find({ buyer: req.params.id })
      .then(founds => {
        res.status(200).json(founds);
      })
      .catch(next);
  }

  static all(req, res, next) {
    Cart.find({})
    .populate("buyer")
      .then(founds => {
        res.status(200).json(founds);
      })
      .catch(next);
  }

  static update(req, res, next) {
    Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    })
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(next);
  }
}

module.exports = ControllerCart;
