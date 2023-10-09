const store = require("./store");

function reserveParking(user, parking, StartTime, EndTime) {
  return new Promise((resolve, reject) => {
    if (!user || !parking || !StartTime || !EndTime) {
      console.error("[messageController] There's no user, parking, or time selected");
      return reject("The provided data was incorrect");
    }

    const actualTime = Date.now();

    if (StartTime.getTime() <= actualTime) {
      console.error("[messageController] The start time already passed");
      return reject("Check your reservation");
    }

    if (StartTime.getTime() >= EndTime.getTime()) {
      console.error("[messageController] The start time and the end time can't be the same and the start time can't be greater than the end time");
      return reject("Check your reservation");
    }

    // Check if StartTime is earlier than 6:00 AM (6:00 is represented as 6*60*60*1000 milliseconds)
    if (StartTime.getHours() < 6) {
      console.error("[messageController] The start time must be at least 6:00 AM");
      return reject("Check your reservation");
    }

    // Check if EndTime is later than 10:00 PM (22:00 is represented as 22*60*60*1000 milliseconds)
    if (EndTime.getHours() > 22) {
      console.error("[messageController] The end time must be no later than 10:00 PM");
      return reject("Check your reservation");
    }

    const fullReserve = {
      user: user,
      parking: parking,
      StartTime: new Date(StartTime),
      EndTime: new Date(EndTime),
    };
    store.reserve(fullReserve);
    console.log(fullReserve);
    resolve(fullReserve);
  });
}


function getReservesByParkingLotDay(parkingLotId) {
  return new Promise((resolve, reject) => {
    resolve(store.reservesOfDayByParkingLot(parkingLotId));
  });
}

function getReserve(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}

function getLastReserve(user, limit){
  return new Promise((resolve, reject) => {
    resolve(store.nextReserve(user,limit));
  });
}

function getDayReservationsOfUsers(userId){
  return new Promise((resolve, reject) => {
    resolve(store.parkingSpotsDailyUser(userId));
  });
}
function getHistoryUser(user, limit){
  return new Promise((resolve, reject) => {
    resolve(store.historyByUser(user,limit));
  });
}
function updateParkingSpot(id, parking, StartTime, EndTime) {
  return new Promise(async (resolve, reject) => {
    if (!parking || !StartTime || !EndTime) {
      reject("Invalid data");
      return false;
    }
    const result = await store.modifyReserve(id, parking, StartTime, EndTime);
    resolve(result);
  });
}
function deleteReserve(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("Id invalido");
      return false;
    }
    store
      .remove(id)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}
module.exports = {
  reserveParking,
  getReserve,
  getHistoryUser,
  getDayReservationsOfUsers,
  updateParkingSpot,
  deleteReserve,
  getLastReserve,
  getReservesByParkingLotDay,
};
