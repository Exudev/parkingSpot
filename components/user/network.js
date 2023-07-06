const express = require("express");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./controller.js");
const store = require("./store")


router.get("/", function(req, res) {
    controller
      .getUser()
      .then((userList) => {
        response.success(req, res, userList, 200);
      })
      .catch((e) => {
        response.error(req, res, "Unexpected Error", 500, e);
      });
  });

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
    if (store.exists(req.body.email)) {
      response.error(
        req,
        res,
        "Este usuario ya existe",
        500,
        "Error en el controlador:"
      );
    } else {
      controller
        .addNewUser(req.body.email, req.body.password, req.body.rol)
        .then((addNewUser) => {
          response.success(req, res, addNewUser, 201);
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
    }
  });
  

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