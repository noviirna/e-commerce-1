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
      required: [true, "Picture is required"]
    },
    stock: {
      type: Number,
      required: [true, "Stock have to be defined"]
    },
    price: {
      type: Number,
      required: [true, "Price have to be defined"]
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    tags: { type: [String] },
    likedby: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
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
