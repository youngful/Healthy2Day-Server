const mongoose = require("mongoose");
const Goods = require("../goods/model")

const dishSchema = new mongoose.Schema({
  img: String,
  name: String,
  type: String,
  goods: [Goods.schema],
  sumKcal: Number,
  weight: Number,
  description: String,
});

dishSchema.pre("save", async function (next) {
  if (!this.weight) {
    this.weight = 0;
  }

  if (!this.sumKcal) {
    this.sumKcal = 0;
  }

  if (this.goods) {
    for (const element of this.goods) {
      this.weight += element.weight;
      this.sumKcal += element.calories;
    }
  }

  next();
});

const Dish = mongoose.model("dish", dishSchema);

module.exports = Dish;