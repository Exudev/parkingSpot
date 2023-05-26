const express = require('express');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller.js');
var message = "";

router.get('/', function(req,res){
    console.log(req.headers);
    res.header({
        "custom-header": message,
    });
    response.success(req,res,'Exudev');
})

router.post('/',function(req,res){
    controller.reserveParking(req.body.user, req.body.parkingSpot, req.body.time)
    .then((reserveParking) => {
        response.success(req,res, reserveParking, 201);
    })
    .catch(e => {
        response.error(req,res,'Error inesperado', 500, 'Error en el controlador')
    });
})
module.exports = router;