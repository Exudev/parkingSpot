const express = require("express");
const response = require("../../../network/response");
const router = express.Router();
const controller = require("./controller.js");

router.get("/", function(req, res) {
    controller
      .getParkingLot()
      .then((parkingSpotList) => {
        response.success(req, res, parkingSpotList, 200);
      })
      .catch((e) => {
        response.error(req, res,  "Unexpected Error: " + e, 500, e);
      });
  });

  router.get("/:id", function(req, res) {
    controller
      .getParkingLotsByOrg(req.params.id)
      .then((parkingLotsList) => {
        response.success(req, res, parkingLotsList, 200);
      })
      .catch((e) => {
        response.error(req, res,  "Unexpected Error: " + e, 500, e);
      });
  });

  router.post("/", function(req, res) {
    controller
      .addNewParkingLot(req.body.organization,req.body.latitude, req.body.longitude, req.body.longitudeDelta, req.body.latitudeDelta,req.body.name, req.body.totalParking, req.body.description)
      .then((addNewParkingLot) => {
        response.success(req, res, addNewParkingLot, 201);
      })
      .catch((e) => {
        response.error(
          req,
          res,
          "Unexpected Error: " + e,
          500,
         e
        );
      });
  });

  router.delete('/:id', function(req,res){
    controller.deleteParkingLot(req.params.id)
    .then (()=> {
        response.success(req,res,`Parking Lot ${req.params.id} eliminada`,200)
    })
    .catch(e => {
        response.error(req,res,  "Unexpected Error: " + e, 500, e);
    })
});

module.exports = router;