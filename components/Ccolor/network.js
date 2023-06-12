const express = require("express");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./controller.js");
var message = "";

router.get("/", function(req, res) {
    controller
      .getColor()
      .then((colorList) => {
        response.success(req, res, colorList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });

  router.post("/", function(req, res) {
    controller
      .addNewColor(req.body.name)
      .then((addNewColor) => {
        response.success(req, res, addNewColor, 201);
      })
      .catch((e) => {
        response.error(
          req,
          res,
          "Error inesperado",
          500,
          "Error en el controlador: " + e.message
        );
      });
  });

  router.delete('/:id', function(req,res){
    controller.deleteColor(req.params.id)
    .then (()=> {
        response.success(req,res,`Color ${req.params.id} eliminado`,200)
    })
    .catch(e => {
        response.error(req,res, 'Error interno', 500, e);
    })
});

module.exports = router;