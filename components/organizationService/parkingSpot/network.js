const express = require("express");
const response = require("../../../network/response");
const router = express.Router();
const controller = require("./controller.js");

router.get("/", function(req, res) {
  const filterReservations = req.query.user || null;
  controller
    .getReserve(filterReservations)
    .then((reserveList) => {
      response.success(req, res, reserveList, 200);
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 500, e);
    });
});

router.post("/", function(req, res) {
  controller
    .reserveParking(req.body.user, req.body.parkingSpot, req.body.time)
    .then((reserveParking) => {
      response.success(req, res, reserveParking, 201);
    })
    .catch((e) => {
      response.error(
        req,
        res,
        "Error inesperado",
        500,
        "Error en el controlador:"
      );
    });
});
router.patch("/:id", function(req, res) {
  console.log(req.params.id);
  controller
    .updateParkingSpot(req.params.id, req.body.time, req.body.parkingSpot)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((e) => {
      response.error(req, res, "Error interno", 500, e);
    });
});

router.delete('/:id', function(req,res){
    controller.deleteReserve(req.params.id)
    .then (()=> {
        response.success(req,res,`Reservacion ${req.params.id} eliminada`,200)
    })
    .catch(e => {
        response.error(req,res, 'Error interno', 500, e);
    })
})
module.exports = router;
