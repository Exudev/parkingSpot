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

async function getReservesByOrganizationForDay(organizationId) {
  const orgId = new ObjectId(organizationId);
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const found = Model.aggregate([
    {
      $match: {
        StartTime: {
          $gt: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    {
      $lookup: {
        from: 'parkings', // The name of your Parking collection
        localField: 'parking',
        foreignField: '_id',
        as: 'parkingInfo',
      },
    },
    {
      $unwind: "$parkingInfo",
    },
    {
      $lookup: {
        from: 'parkinglots', // The name of your ParkingLot collection
        localField: 'parkingInfo.parkingLot',
        foreignField: '_id',
        as: 'parkingLotInfo',
      },
    },
    {
      $unwind: "$parkingLotInfo",
    },
    {
      $match: {
        'parkingLotInfo.organization': orgId,
      },
    },
    {
      $project: {
        user: 1,
        parking: 1,
        StartTime: 1,
        EndTime: 1,
      },
    },
  ]).exec();

  return found;
}

async function getReservesByParkingForDay(parkingId) {
    const PI = new ObjectId(parkingId);
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
  
    const reservations = await Model.find({
      parking: PI,
      StartTime:{
        $gt :startOfDay ,
        $lt :endOfDay,
    },
    });
  
    return reservations;
  }
     
  async function historyByUser(userId) {
    try {
      const reservations = await Model.find({ user: new ObjectId(userId) })
        .populate({
          path: 'parking',
          populate: {
            path: 'parkingLot',
            populate: {
              path:'organization',
              select: 'organizationName _id latitude longitude latitudeDelta longitudeDelta',
            },
            select: 'name _id latitude longitude', // Specify the fields you want from parkingLot
          },
          select: 'parking basePrice', // Specify the fields you want from parking
        })
        .exec();
  
      return reservations;
    } catch (error) {
      throw error;
    }
  }
  
  async function parkingSpotsDailyUser(userId) {
    const currentDate = new Date();
  
    // Set the time to the beginning of the day (midnight)
   const  startOfDay = currentDate.setHours(0, 0, 0, 0);
  
    // Calculate the end of the day (just before midnight)
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);
  
    try {
        const reservations = await Model.find({ user: new ObjectId(userId), StartTime:{
            $gt :startOfDay ,
            $lt :endOfDay,
        }, })
        .populate({
          path: 'parking',
          populate: {
            path: 'parkingLot',
            select: 'name _id latitude longitude', // Specify the fields you want from parkingLot
          },
          select: 'parking basePrice', // Specify the fields you want from parking
        })
        .exec();
  
  
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
    getReservesByParkingForDay: getReservesByParkingForDay,
    getReservesByOrganizationForDay: getReservesByOrganizationForDay,
    historyByUser: historyByUser,
    parkingSpotsDailyUser: parkingSpotsDailyUser,
    list: seeAllReserved,
    modifyReserve: updateParking,
    remove: removeReservation,
    nextReserve:findClosestReservation,
    
}