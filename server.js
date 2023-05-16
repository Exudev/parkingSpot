const express = require('express');
const bodyParser = require('body-parser');
const response = require('./network/response');
const router = express.Router();
var port = 3000;
var app = express();


app.use(router);

router.get('/parking', function(req,res) {
    console.log(req.headers);
    res.header({
        "custom-header": "Nuestro valor personalizado",
    });
    res.send('listado de carro');
});

router.get('/login', function(username, password,req,res) {
    // console.log(req.headers);
    // res.header({
    //     "custom-header": "Nuestro valor personalizado",
    // });
    // res.send('listado de carro');
});
app.use('/app', express.static('./public'));

app.listen(port);
console.log('La aplicacion esta escuchando en el Localhost: ' + port);