const express = require("express");
const router = express.Router();

const userRoutes = require("../domains/user");
const goodsRoutes = require("../domains/goods");
const dishRouter = require("../domains/dish")

router.use("/user", userRoutes);
router.use("/goods", goodsRoutes);
router.use("/dish", dishRouter)


module.exports = router;
