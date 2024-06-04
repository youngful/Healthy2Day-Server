const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
require('dotenv').config();
require('./config/db');

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://healthy2-day.vercel.app'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

module.exports = app;
