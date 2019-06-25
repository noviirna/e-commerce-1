const User = require(`../models/user`);
const Product = require(`../models/product`);
const { generateToken } = require("../helpers/token");

module.exports = {
  createMockUser: function(user) {
    if (process.env.NODE_ENV == "test") {
      User.create(user)
        .then(created => {})
        .catch(err => {});
    }
  },
  deleteAllUser: function() {
    if (process.env.NODE_ENV == "test") {
      User.deleteMany({})
        .then(deleted => {})
        .catch(err => {});
    }
  },
  deleteAllProduct: function() {
    if (process.env.NODE_ENV == "test") {
      Product.deleteMany({})
        .then(deleted => {})
        .catch(err => {});
    }
  },
  mockLogin: function(user) {
    return generateToken(user);
  },
  createMockProducts: function(product) {
    let products = [];
    for (let i = 0; i < 10; i++) {
      products.push(product);
    }
    Product.insertMany(products)
      .then(res => {})
      .catch(err => {});
  }
};
