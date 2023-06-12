const express = require('express');
const user = require('../components/user/network');
const parking_spot = require('../components/parkingSpot/network');
const color = require('../components/Ccolor/network');
const brand = require('../components/Cbrand/network');
//const router = express.Router();
const routes = function (server){
    server.use('/user', user),
    server.use('/parking-spot', parking_spot),
    server.use('/color', color),
    server.use('/brand', brand)
}


module.exports = routes;