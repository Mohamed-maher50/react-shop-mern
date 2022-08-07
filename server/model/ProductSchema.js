const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "write this type of this product"],
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: [true, "type price please"],
  },
  isAdmin: Boolean,
  imgurl: {
    type: String,
    required: true,
  },
  imgName: { type: String, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
