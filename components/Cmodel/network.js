const express = require("express");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./controller.js");
var message = "";

router.get("/", function(req, res) {
    controller
      .getModel()
      .then((ModelList) => {
        response.success(req, res, ModelList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });

  router.post("/", function(req, res) {
    controller
      .addNewModel(req.body.brand,req.body.name)
      .then((addNewModel) => {
        response.success(req, res, addNewModel, 201);
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
    controller.deleteModel(req.params.id)
    .then (()=> {
        response.success(req,res,`Model ${req.params.id} eliminada`,200)
    })
    .catch(e => {
        response.error(req,res, 'Error interno', 500, e);
    })
});

module.exports = router;