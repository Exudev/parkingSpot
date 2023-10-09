const express = require("express");
const response = require("../../../network/response");
const router = express.Router();
const controller = require("./controller.js");
// bring reservations
router.get("/:user", function(req, res) {
  const filterReservations = req.params.user || null;
  controller
    .getReserve(filterReservations)
    .then((reserveList) => {
      response.success(req, res, reserveList, 200);
      
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 500, e);
    });
});

//bring Parking Lot reservations for the current day
router.get("/parkingLot/:id", function(req, res) {
  const parkingLotId = req.params.id;
  controller
    .getReservesByParkingLotDay(parkingLotId)
    .then((reserveList) => {
      response.success(req, res, reserveList, 200);
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 500, e);
    });
});

router.get("/history/:user", function(req, res) {
  controller
    .getHistoryUser(req.params.user)
    .then((reservations) => {
      response.success(req, res, reservations, 200);
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 500, e);
    });
});

router.get("/day/:user", function(req, res) {
  controller
    .getDayReservationsOfUsers(req.params.user)
    .then((reservations) => {
      response.success(req, res, reservations, 200);
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 500, e);
    });
});

router.get("/next/:user", function(req, res) {
  controller
    .getLastReserve(req.params.user)
    .then((reservations) => {
      response.success(req, res, reservations, 200);
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 500, e);
    });
});
//make a reservation
router.post("/", function(req, res) {
  controller
    .reserveParking(req.body.user, req.body.parking, req.body.StartTime, req.body.EndTime)
    .then((reserveParking) => {
      response.success(req, res, reserveParking, 201);
    })
    .catch((e) => {
      response.error(
        req,
        res,
        "Error inesperado",
        500,
        "Error en el controlador:" + e.message
      );
    });
});

//modify a reservation
router.patch("/:id", function(req, res) {
  console.log(req.params.id);
  controller
    .updateParkingSpot(req.params.id, req.body.parking, req.body.StartTime, req.body.EndTime)
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
