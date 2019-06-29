const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "required"]
    },
    status: String,
    products: Array,
    products_amount: {
      type: Number,
      min: [0, "Value must be equal or greater by 0"]
    },
    ship_address: {
      type: String,
      required: [true, "Address is required"]
    },
    ship_city: {
      type: String,
      required: [true, "Address is required"]
    },
    ship_amount: Number,
    ship_receipt: String,
    total: {
      type: Number,
      min: [0, "Value must be equal or greater by 0"]
    },
    transfer_receipt: String
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

Cart.schema.path("status").validate(function(value) {
  if (
    "checkout-transfered-confirmed-shipped-accepted".indexOf(
      String(value).toLowerCase()
    ) !== -1
  ) {
    return true;
  } else {
    return false;
  }
}, "Invalid input");

Cart.schema.path("status").validate(function(value) {
  if (typeof value !== "string") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Cart.schema.path("products").validate(function(value) {
  if (typeof value !== "object") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Cart.schema.path("products_amount").validate(function(value) {
  if (typeof value !== "number") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Cart.schema.path("ship_address").validate(function(value) {
  if (typeof value !== "string") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Cart.schema.path("ship_city").validate(function(value) {
  if (typeof value !== "string") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Cart.schema.path("ship_amount").validate(function(value) {
  if (typeof value !== "string") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Cart.schema.path("ship_receipt").validate(function(value) {
  if (typeof value !== "string") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Cart.schema.path("total").validate(function(value) {
  if (typeof value !== "number") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Cart.schema.path("transfer_receipt").validate(function(value) {
  if (typeof value !== "string") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

module.exports = Cart;
