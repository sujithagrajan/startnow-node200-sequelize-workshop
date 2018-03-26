const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const db = require('./db/models');
const morgan = require('morgan');
/* sequelize configuration */
db.sequelize.sync();

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send();
});

app.use("/api/authors", require("./routes/authors"));
app.use("/api/blogs", require("./routes/blogs"));
module.exports = app;