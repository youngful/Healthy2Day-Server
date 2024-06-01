const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  translatedName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  carbohydrates: {
    type: Number,
    required: true,
  },
});

const Goods = mongoose.model("goods", goodsSchema);

module.exports = Goods;