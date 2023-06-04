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

async function seeAllReserved(){
    const reserves = await Model.find()  ;
    return reserves;
}

module.exports = {
    reserve: ReserveParkingSpot,
    list: seeAllReserved,
}