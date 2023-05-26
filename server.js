const express = require('express');
const bodyParser = require('body-parser');
const response = require('./network/response');
const router = require('./network/routes');
var port = 3000;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);
app.use('/app', express.static('./public'));

app.listen(port);
console.log('La aplicacion esta escuchando en el Localhost: ' + port);