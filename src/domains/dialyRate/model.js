const mongoose = require("mongoose");

const dialyRateSchema = new mongoose.Schema({
    kcal: Number,
    protein: Number,
    carbohydrate: Number,
    lipid: Number,
    vitamin: Number
});


const dialyRate = mongoose.model("dialyRate", dialyRateSchema);

module.exports = dialyRate;