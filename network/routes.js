
const brand = require('../components/Cbrand/network');
const color = require('../components/Ccolor/network');
const model = require('../components/Cmodel/network');
const parking= require('../components/parking/network');
const parkingLot = require('../components/parkingLot/network');
const parking_spot = require('../components/parkingSpot/network');
const user = require('../components/user/network');
const userDriver = require('../components/userDriver/network');
const userModerator = require('../components/userModerator/network');
const vehicle = require('../components/vehicle/network');


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
  }
  
  module.exports = routes;
  