const jwt = require(`jsonwebtoken`);
// const Model = require(`../models/cart`);

module.exports = {
  authentication: function(req, res, next) {
    try {
      let decoded = jwt.verify(req.headers.token, process.env.SECRET_JWT);
      req.user = decoded;
      next();
    } catch (err) {
      console.log("\n\n\n\n\n\n");
      console.log(err);
      console.log("\n\n\n");
      console.log(JSON.stringify(err, undefined, 2));
      next({
        code: 401,
        message: `login first!`
      });
    }
  }
  // authorization: function(req, res, next) {
  //   let condition = {
  //     _id: req.params.id,
  //     author: req.user._id
  //   };

  //   Model.findOne(condition)
  //     .then(result => {
  //       if (result) {
  //         next();
  //       } else {
  //         next({
  //           code: 401,
  //           message: `access not allowed!`
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       console.log("\n\n\n\n\n\n");
  //       console.log(err);
  //       console.log("\n\n\n");
  //       console.log(JSON.stringify(err, undefined, 2));
  //       next({
  //         code: 500,
  //         message: `internal server error!`
  //       });
  //     });
  // }
};
