const jwt = require(`jsonwebtoken`);
const User = require(`../models/user`);
const Product = require(`../models/product`);

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
              message: `Invalid access token, you have to login first`
            });
          } else {
            next();
          }
        })
        .catch(err => {
          next({
            code: 401,
            message: `Invalid access token, you have to login first`
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
  }
};
