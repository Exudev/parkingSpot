const express = require("express");
const response = require("../../../network/response");
const router = express.Router();
const controller = require("./controller.js");


router.get("/", function(req, res) {
    controller
      .getOrganization()
      .then((OrganizationList) => {
        response.success(req, res, OrganizationList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });

  router.get("/info", function(req, res) {
    controller
      .info()
      .then((OrganizationList) => {
        response.success(req, res, OrganizationList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });


  router.post("/", function(req, res) {
      controller
        .addNewOrganization(req.body.organizationName, req.body.coodernates, req.body.organizationOwner)
        .then((addOrganization) => {
          response.success(req, res, addOrganization, 201);
        })
        .catch((e) => {
          response.error(
            req,
            res,
            e,
            500,
            "Error en el controlador:"
          );
        });
    
  });
  
  router.delete('/:id', function(req,res){
    controller.deleteOrganization(req.params.id)
    .then (()=> {
        response.success(req,res,`Organizacion ${req.params.id} eliminada`,200)
    })
    .catch(e => {
        response.error(req,res, 'Error interno', 500, e);
    })
});

module.exports = router;