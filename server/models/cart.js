const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Input is not complete"]
    },
    status: String,
    products: Array,
    products_amount: {
      type: Number,
      min: [0, "Amount must be equal or greater by 0"]
    },
    ship_address: {
      type: String
    },
    ship_city: {
      type: String
    },
    ship_amount: {
      type: Number,
      min: [0, "Ship amount must be equal or greater by 0"]
    },
    ship_receipt: String,
    total: {
      type: Number,
      min: [0, "Total must be equal or greater by 0"]
    },
    transfer_receipt: String
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

CartSchema.pre("save", function(next) {
  this.total = this.products_amount + this.ship_amount;
  next();
});

Cart.schema.path("status").validate(function(value) {
  if (
    "checkout-transfer-confirmed-shipped-received-cancel".indexOf(
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
  if (typeof value !== "number") {
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
