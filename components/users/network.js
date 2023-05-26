
const express = require('express');
const response = require('../../network/response');
const router = express.Router();
var message = "";

router.get('/', function(req,res){
    console.log(req.headers);
    res.header({
        "custom-header": message,
    });
    response.success(req,res,'Exudev');
})

router.post('/',function(req,res){
    console.log(req.query);
    if(req.query.error == "ok"){
        response.error(req,res,'Error inesperado', 500, 'Es solo una simulacion')
    } else{
        response.success(req,res,'creado correctamente', 201, 'Exudev');
    }
})

module.exports = router;