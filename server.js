const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("./config/index");
require("dotenv").config();
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${config.dbHost}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const response = require('./network/response');
const db = require("./db");

const router = require("./network/routes");

db(MONGO_URI);
var port = 3000;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);
app.use("/app", express.static("./public"));

app.listen(port);
console.log("La aplicacion esta escuchando en el Localhost: " + port);
