const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
require("dotenv").config();
require("./config/db");

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://healthy2-day-server.vercel.app'],
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization'
}));

app.use(cookieParser());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
