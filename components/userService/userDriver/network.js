const express = require("express");
const response = require("../../../network/response");
const router = express.Router();
const controller = require("./controller.js");


router.get("/", function(req, res) {
    controller
      .getUserDriverList()
      .then((userDriverList) => {
        response.success(req, res, userDriverList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });

  router.post("/", async function(req, res) {
    controller
      .addNewUserDriver(req.body.user, req.body.firstName, req.body.lastName, req.body.birthDate,  req.body.phone)
      .then((addNewUser) => {
        response.success(req, res, addNewUser, 201);
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

  router.delete('/:id', function(req,res){
    controller.deleteUserDriver(req.params.id)
    .then (()=> {
        response.success(req,res,`Usuario ${req.params.id} eliminada`,200)
    })
    .catch(e => {
        response.error(req,res, 'Error interno', 500, e);
    })
});

module.exports = router;