const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Dish = require("../dish/model");
const Goods = require("../goods/model");
const dialyRate = require("../dialyRate/model");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  alergic: [Goods.schema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastPasswordChange: {
    type: Date,
    default: Date.now,
  },
  savedDishes: [Dish.schema],
  createdDishes: [Dish.schema],
  weight: Number,
  height: Number,
  age: Number,
  activityName: String,
  activityIndex: Number,
  sex: {
    type: String,
    enum: ["M", "W"],
  },
  savedDialyRate: dialyRate.schema
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      user.lastLogin = Date.now();
      await user.save();
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;