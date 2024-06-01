const express = require("express");
const routes = express.Router();

const {
    createDish,
    get_dishes
} = require("./controller");

routes.post("/create_dish", createDish);
routes.get("/get_dishes", get_dishes);

module.exports = routes;