const Cart = require(`../models/cart`);

class ControllerCart {
  static create(req, res, next) {
    Cart.create(req.body)
      .then(created => {
        res.status(201).json(created);
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
    Cart.find({ userId: req.user._id })
      .then(founds => {
        res.status(200).json(founds);
      })
      .catch(next);
  }

  static all(req, res, next) {
    Cart.find({})
      .then(founds => {
        res.status(200).json(founds);
      })
      .catch(next);
  }

  static update(req, res, next) {
    Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(next);
  }
}

module.exports = ControllerCart;
