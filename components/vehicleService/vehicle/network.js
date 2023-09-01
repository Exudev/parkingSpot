const express = require("express");
const response = require("../../../network/response");
const router = express.Router();
const controller = require("./controller.js");

router.get("/", function(req, res) {
    controller
      .getVehicle()
      .then((vehicleList) => {
        response.success(req, res, vehicleList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });
  router.get("/byUser/:id", function(req, res) {
    controller
      .getVehiclesByUser(req.params.id)
      .then((vehicleList) => {
        response.success(req, res, vehicleList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500,  e);
      });
  });
  router.post("/", function(req, res) {
    controller
      .addVehicle(req.body.model, req.body.color, req.body.owner, req.body.year, req.body.plate)
      .then((addVehicle) => {
        response.success(req, res, addVehicle, 201);
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
    controller.deleteParkingLot(req.params.id)
    .then (()=> {
        response.success(req,res,`Vehicle${req.params.id} eliminada`,200)
    })
    .catch(e => {
        response.error(req,res, 'Error interno', 500, e);
    })
});

module.exports = router;