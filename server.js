const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("./config/index");
require("dotenv").config();
const MONGO_URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;
const response = require('./network/response');
const db = require("./db");

const router = require("./network/routes");

db(MONGO_URI);
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);
app.use("/app", express.static("./public"));

app.listen(config.port);
console.log("La aplicacion esta escuchando en el Localhost: " + config.dbPort);
