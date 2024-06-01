const express = require("express");
const routes = express.Router();

const {
    goodsSearch,
} = require("./controller");

routes.get("/search", goodsSearch);

module.exports = routes;