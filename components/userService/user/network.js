const express = require("express");
const response = require("../../../network/response");
const router = express.Router();
const controller = require("./controller.js");

//GET SECTION
router.get("/", function(req, res) {
    controller
      .getUsers()
      .then((userList) => {
        response.success(req, res, userList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });

  router.get("/:id", function(req, res) {
    controller
      .getUser(req.params.id)
      .then((user) => {
        response.success(req, res, user, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });


  router.get("/info/:id", function(req, res) {
    controller
      .getInfoAndCars(req.params.id)
      .then((userProfileInfo) => {
        response.success(req, res, userProfileInfo, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });

  //POST SECTION
  router.post("/login", function(req, res) {
    controller
      .login(req.body.email, req.body.password)
      .then((result) => {
        response.success(req, res, result, 200);
      })
      .catch((error) => {
        response.error(req, res, "Unexpected Error", 500, error);
      });
  });

  router.post("/", function(req, res) {
      controller
        .addNewUser(req.body.email, req.body.password)
        .then((addNewUser) => {
          response.success(req, res, addNewUser, 201);
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
  
  router.put("/activate", function(req, res) {
    controller
      .activateUser(req.body.token, req.body.userId)
      .then((activateUser) => {
        response.success(req, res, activateUser, 201);
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

router.put("/forgot-password", function(req, res) {
  controller
    .forgotPassword(req.body.email)
    .then((forgotPassword) => {
      response.success(req, res, forgotPassword, 201);
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

router.put("/set-new-password", function(req, res) {
  controller
    .setNewPassword(req.body.token, req.body.email, req.body.password, req.body.confirmPassword)
    .then((changedPassword) => {
      response.success(req, res, changedPassword, 201);
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

  // DELETE SECTION
  router.delete('/:id', function(req,res){
    controller.deleteUser(req.params.id)
    .then (()=> {
        response.success(req,res,`Usuario ${req.params.id} eliminada`,200)
    })
    .catch(e => {
        response.error(req,res, 'Error interno', 500, e);
    })
});

module.exports = router;