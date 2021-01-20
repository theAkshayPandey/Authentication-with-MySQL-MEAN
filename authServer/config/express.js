const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require("../middleware/passport");
const routes = require('../routes/index.route')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(passport.initialize());

app.use("/api/", routes);

module.exports = app;