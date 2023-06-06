const express = require('express');
const user = require('../components/user/network');
const parking_spot = require('../components/parkingSpot/network');
//const router = express.Router();
const routes = function (server){
    server.use('/user', user),
    server.use('/parking-spot', parking_spot)
}


module.exports = routes;