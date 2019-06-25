const jwt = require(`jsonwebtoken`);
// const Model = require(`../models/cart`);

module.exports = {
  authentication: function(req, res, next) {
    try {
      let decoded = jwt.verify(req.headers.token, process.env.SECRET_JWT);
      req.user = decoded;
      next();
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
  }
};
