const Product = require(`../models/product`);

class ControllerProduct {
  static create(req, res, next) {
    if (req.body.tags == null) {
      req.body.tags = [];
    }

    if (req.body.likedby == null) {
      req.body.likedby = [];
    }

    Product.create(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }

  static delete(req, res, next) {
    Product.findByIdAndDelete(req.params.id)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(next);
  }

  static detail(req, res, next) {
    Product.findById(req.params.id)
      .then(found => {
        if (found) {
          res.status(200).json(found);
        } else {
          res.status(400).json({ message: `that is not exists` });
        }
      })
      .catch(next);
  }

  static all(req, res, next) {
    Product.find({})
      .then(founds => {
        res.status(200).json(founds);
      })
      .catch(next);
  }

  static update(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, req.body, {
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

module.exports = ControllerProduct;
