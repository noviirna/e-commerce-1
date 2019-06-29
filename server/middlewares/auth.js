const jwt = require(`jsonwebtoken`);
const User = require(`../models/user`);
const Product = require(`../models/product`);
const Cart = require(`../models/cart`);
const { ObjectID } = require("mongodb");

module.exports = {
  authentication: function(req, res, next) {
    try {
      let decoded = jwt.verify(req.headers.token, process.env.SECRET_JWT);
      req.user = decoded;
      User.findOne({ email: req.user.email })
        .then(found => {
          if (!found) {
            next({
              code: 401,
              message: `You have no access to do this`
            });
          } else {
            next();
          }
        })
        .catch(err => {
          next({
            code: 500,
            message: `Internal Server Error`
          });
        });
    } catch (err) {
      next({
        code: 401,
        message: `Invalid access token, you have to login first`
      });
    }
  },
  adminAccess: function(req, res, next) {
    if (req.user.email === "admin@ecommerce.com") {
      next();
    } else {
      next({
        code: 401,
        message: `You have no access to do this`
      });
    }
  },
  productAuth: function(req, res, next) {
    Product.findById(req.params.id)
      .then(found => {
        if (found) {
          next();
        } else {
          next({
            code: 404,
            message: `Product didnt exist`
          });
        }
      })
      .catch(err => {
        next({
          code: 404,
          message: `Product didnt exist`
        });
      });
  },
  cartAuth: function(req, res, next) {
    if (req.user.email === "admin@ecommerce.com") {
      Cart.findById(req.params.id)
        .then(found => {
          if (found) {
            next();
          } else {
            next({
              code: 404,
              message: `Cart didnt exist`
            });
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
          next({
            code: 500,
            message: `Internal server error`
          });
        });
    } else {
      Cart.findOne({ _id: req.params.id })
        .then(found => {
          if (found) {
            if (found.buyer == req.user._id) {
              next();
            } else {
              next({
                code: 401,
                message: `You have no access to do this`
              });
            }
          } else {
            next({
              code: 404,
              message: `Cart did not exist`
            });
          }
        })
        .catch(err => {
          next({
            code: 500,
            message: `Internal server error`
          });
        });
    }
  }
};
