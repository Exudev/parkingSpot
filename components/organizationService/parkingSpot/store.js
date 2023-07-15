const Model = require('./model');

function ReserveParkingSpot(fullReserve){
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
    const reserves = await Model.find(filter)
    .populate('parking','parking')
    .populate('user','firstName')
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