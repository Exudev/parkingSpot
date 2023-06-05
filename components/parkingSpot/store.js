const { config } = require('../../config/index');
const Model = require('./model');
const db = require('mongoose');
require('dotenv').config();
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${config.dbHost}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
db.Promise = global.Promise;
db.connect(MONGO_URI);
console.log('[db] Conectada con exito');


function ReserveParkingSpot(fullReserve){
  //  list.push(fullReserve);
  const myReserve = new Model(fullReserve);
   myReserve.save();
}

async function updateParking(id, parkingSpot, time){
    const foundParkingSpot = await Model.findOne({
        _id: id
    });
   
        foundParkingSpot.parkingSpot = parkingSpot;
        foundParkingSpot.time = time;
        const newReserve = await foundParkingSpot.save();
        return newReserve;
}
async function seeAllReserved(filterUser){
    let filter = {};

    if(filterUser !== null){
        filter = {user: filterUser};
    }
    const reserves = await Model.find(filter);
    return reserves;
}

function removeReservation(id){
   return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    reserve: ReserveParkingSpot,
    list: seeAllReserved,
    modifyReserve: updateParking,
    remove: removeReservation,
}