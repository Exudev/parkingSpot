
const brand = require('../components/vehicleService/Cbrand/network');
const color = require('../components/vehicleService/Ccolor/network');
const model = require('../components/vehicleService/Cmodel/network');
const parking= require('../components/organizationService/parking/network');
const parkingLot = require('../components/organizationService/parkingLot/network');
const parking_spot = require('../components/organizationService/parkingSpot/network');
const user = require('../components/userService/user/network');
const userDriver = require('../components/userService/userDriver/network');
const userModerator = require('../components/userService/userModerator/network');
const vehicle = require('../components/vehicleService/vehicle/network');
const organization = require('../components/organizationService/organization/network');

const routes = function(server) {
    server.use((req, res, next) => {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19000'); // Replace with the actual URL of your client
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true'); // Add this line to allow credentials
      next();
    });
  
    server.use('/user', user);
    server.use('/parking-spot', parking_spot);
    server.use('/color', color);
    server.use('/brand', brand);
    server.use('/model', model);
    server.use('/user-moderator', userModerator);
    server.use('/user-driver', userDriver);
    server.use('/parking', parking);
    server.use('/parking-lot', parkingLot);
    server.use('/vehicle', vehicle);
    server.use('/organization', organization)
  }
  
  module.exports = routes;
  