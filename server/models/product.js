const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    picture: {
      type: String,
      required: [true, "Picture is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock have to be defined"],
      min: [0, 'Stock must be equal or greater by 0'],
    },
    price: {
      type: Number,
      required: [true, "Price have to be defined"],
      min: [0, 'Price must be equal or greater by 0'],
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    tags: { type: [String] }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

Product.schema.path("stock").validate(function(value) {
  if (typeof value !== "number") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Product.schema.path("name").validate(function(value) {
  if (typeof value !== "string") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Product.schema.path("picture").validate(function(value) {
  if (typeof value !== "string") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Product.schema.path("description").validate(function(value) {
  if (typeof value !== "string") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Product.schema.path("price").validate(function(value) {
  if (typeof value !== "number") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

Product.schema.path("tags").validate(function(value) {
  if (typeof value !== "object") {
    return false;
  } else {
    return true;
  }
}, "Invalid input");

module.exports = Product;

/**
var schema = new Schema(
  {
    name: String,
    binary: Buffer,
    living: Boolean,
    updated: { type: Date, default: Date.now },
    age: { type: Number, min: 18, max: 65 },
    mixed: Schema.Types.Mixed,
    _someId: Schema.Types.ObjectId,
    decimal: Schema.Types.Decimal128,
    array: [],
    ofString: [String],
    ofNumber: [Number],
    ofDates: [Date],
    ofBuffer: [Buffer],
    ofBoolean: [Boolean],
    ofMixed: [Schema.Types.Mixed],
    ofObjectId: [Schema.Types.ObjectId],
    ofArrays: [[]],
    ofArrayOfNumbers: [[Number]],
    nested: {
      stuff: { type: String, lowercase: true, trim: true }
    },
    map: Map,
    mapOfString: {
      type: Map,
      of: String
    }
  },
  { timestamps: true }
);
 */
