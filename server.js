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

let retryAttempts = 0;
const maxRetryAttempts = 5;

function startServer() {
   app.listen(config.port, () => {
      console.log("La aplicacion esta escuchando en el Localhost: " + config.port);
   }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
         if (retryAttempts < maxRetryAttempts) {
            retryAttempts++;
            console.log(`El puerto ${config.port} esta en uso. Reintentando en 5 segundo... (Intento ${retryAttempts} de ${maxRetryAttempts})`);
            setTimeout(() => {
               startServer();
            }, 5000);
         } else {
            console.error(`El puerto ${config.port} sigue en uso después de ${maxRetryAttempts} intentos. Aplicación apagada.`);
            process.exit(1); // Shut down the application
         }
      } else {
         console.error("Error al iniciar el servidor:", err);
      }
   });
}

startServer();
