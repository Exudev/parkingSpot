const express = require("express");
const response = require("../../../network/response");
const router = express.Router();
const controller = require("./controller.js");

router.get("/", function(req, res) {
    controller
      .getBrand()
      .then((BrandList) => {
        response.success(req, res, BrandList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });

  router.post("/", function(req, res) {
    controller
      .addNewBrand(req.body.name)
      .then((addNewBrand) => {
        response.success(req, res, addNewBrand, 201);
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
    controller.deleteBrand(req.params.id)
    .then (()=> {
        response.success(req,res,`The  ${req.params.id} brand was eliminated`,200)
    })
    .catch(e => {
        response.error(req,res, 'Intern Error', 500, e);
    })
});

module.exports = router;