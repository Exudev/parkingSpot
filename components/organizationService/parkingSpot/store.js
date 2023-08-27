const Model = require('./model');

function ReserveParkingSpot(fullReserve){
  const myReserve = new Model(fullReserve);
   myReserve.save();
}

async function updateParking(id, parking, StartTime, EndTime){
    const foundParkingSpot = await Model.findOne({
        _id: id
    });
        foundParkingSpot.parking = parking;
        foundParkingSpot.StartTime = StartTime;
        foundParkingSpot.EndTime = EndTime;
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

async function findClosestReservation(userId, limit) {
    const now = new Date();
    const closestReservation = await Model.findOne({ user: userId, StartTime: { $gte: now } })
        .sort({ StartTime: 1 }) 
        .limit(limit)
        .populate('parking', 'parking')
        .populate('user', 'firstName')
        .exec();

    return closestReservation;
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
    nextReserve:findClosestReservation,
    
}