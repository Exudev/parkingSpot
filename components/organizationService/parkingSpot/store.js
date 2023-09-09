const Model = require('./model');
const { ObjectId } = require('mongodb');

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

async function getReservesByParkingLotForDay(parkingLotId){
    const pLI = new ObjectId(parkingLotId);
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0); 
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);// Set the time to the beginning of the day
  
const found =  Model.aggregate([
        {
            $match:{
                StartTime:{
                    $gt :startOfDay ,
                    $lt :endOfDay,
                },
            },
        },
        {
            $lookup:{
                from: 'parkings', // The name of your Parking collection
                localField: 'parking',
                foreignField: '_id',
                as: 'parkingInfo',
              },
            },
              {
                $unwind:"$parkingInfo",
              },
              {
                $match:{
                    'parkingInfo.parkingLot': new ObjectId(pLI),
                },
              },
              {
                $project:{
                    user: 1,
                    parking:1,
                    StartTime: 1,
                    EndTime: 1,
                },
              },
            ])
     .exec()
   
       return found;
}
     
async function historyByUser(userId){
   return Model.find({user: userId})
}

async function parkingSpotsDailyUser(userId) {
    const currentDate = new Date();

    // Set the time to the beginning of the day (midnight)
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the end of the day (just before midnight)
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);

    try {
        // Find models for the given user with startTime between the current day's start and end
        const reservations = await Model.find({
            user: userId,
            StartTime: {
                $gte: currentDate, // Greater than or equal to the current date (beginning of the day)
                $lte: endOfDay,   // Less than or equal to the current date (end of the day)
            },
        }).exec();
        return reservations;
    } catch (error) {
        // Handle any errors that may occur during the database query
        throw error;
    }
}






function removeReservation(id){
   return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    reserve: ReserveParkingSpot,
    reservesOfDayByParkingLot: getReservesByParkingLotForDay,
    historyByUser: historyByUser,
    parkingSpotsDailyUser: parkingSpotsDailyUser,
    list: seeAllReserved,
    modifyReserve: updateParking,
    remove: removeReservation,
    nextReserve:findClosestReservation,
    
}