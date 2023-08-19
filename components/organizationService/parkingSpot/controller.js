const store = require("./store");

function reserveParking(user, parking, StartTime, EndTime) {
  return new Promise((resolve, reject) => {
    if (!user || !parking || !StartTime|| !EndTime) {
      console.error(
        "[messageController] Theres no user or park or time selected"
      );
      return reject("The provided data was incorrect");
    }

    const fullReserve = {
      user: user,
      parking: parking,
      StartTime:new Date(StartTime),
      EndTime: new Date(EndTime),
    };
    store.reserve(fullReserve);
    console.log(fullReserve);
    resolve(fullReserve);
  });
}
function isValidISOString(dateString) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(dateString);
}

function getReserve(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}
function updateParkingSpot( user, parking, StartTime, EndTime) {
  return new Promise(async (resolve, reject) => {
    if (!user||!parking || !StartTime || !EndTime) {
      reject("Invalid data");
      return false;
    }
    const result = await store.modifyReserve(user, parking, StartTime, EndTime);
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
  updateParkingSpot,
  deleteReserve,
};
