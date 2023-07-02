const express = require("express");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./controller.js");
var message = "";

router.get("/", function(req, res) {
    controller
      .getParking()
      .then((parkingList) => {
        response.success(req, res, parkingList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });

  router.post("/", function(req, res) {
    controller
      .addNewParking(req.body.parkingLot,req.body.parking, req.body.basePrice)
      .then((addNewParking) => {
        response.success(req, res, addNewParking, 201);
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
    controller.deleteParking(req.params.id)
    .then (()=> {
        response.success(req,res,`Parking ${req.params.id} eliminada`,200)
    })
    .catch(e => {
        response.error(req,res, 'Error interno', 500, e);
    })
});

module.exports = router;