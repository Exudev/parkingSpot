const express = require("express");
const response = require("../../../network/response");
const router = express.Router();
const controller = require("./controller.js");



router.get("/all", function(req, res) {
    controller
      .getAllOrganization()
      .then((OrganizationList) => {
        response.success(req, res, OrganizationList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error: " + e, 500, e);
      });
  });

router.get('/one/:id',  function (req, res) {
    controller
      .getOrganization(req.params.id)
      .then((organization) => {
       response.success(req, res, organization, 200);
    })
     .catch((e) =>{
      response.error(req, res,  "Unexpected Error: " + e, 500, e);
    }
     )
  });

router.get("/info", function(req, res) {
    controller
      .info()
      .then((OrganizationList) => {
        response.success(req, res, OrganizationList, 200);
      })
      .catch((e) => {
        response.error(req, res,  "Unexpected Error: " + e, 500, e);
      });
  });


router.post("/", function(req, res) {
      controller
        .addNewOrganization(req.body.organizationName, 
           req.body.latitude,
           req.body.longitude, 
           req.body.longitudeDelta,
           req.body.latitudeDelta, 
           req.body.organizationOwner)
        .then((addOrganization) => {
          response.success(req, res, addOrganization, 201);
        })
        .catch((e) => {
          response.error(
            req,
            res,
            "Unexpected Error: " + e,
            500,
            e,
          );
        });
    
  });
  
router.delete('/:id', function(req,res){
    controller.deleteOrganization(req.params.id)
    .then (()=> {
        response.success(req,res,`Organizacion ${req.params.id} eliminada`,200)
    })
    .catch(e => {
        response.error(req,res,  "Unexpected Error: " + e, 500, e);
    })
});

module.exports = router;