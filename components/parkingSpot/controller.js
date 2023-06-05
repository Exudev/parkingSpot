const store = require("./store");

function reserveParking(user, parkingSpot, time) {
  return new Promise((resolve, reject) => {
    if (!user || !parkingSpot || !time) {
      console.error(
        "[messageController] Theres no user or park or time selected"
      );
      return reject("The provided data was incorrect");
    }
    const fullReserve = {
      user: user,
      parkingSpot: parkingSpot,
      time: new Date(),
    };
    store.reserve(fullReserve);
    console.log(fullReserve);
    resolve(fullReserve);
  });
}
function getReserve(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}
function updateParkingSpot(id, parkingSpot, time) {
  return new Promise(async (resolve, reject) => {
    if (!id || !parkingSpot || !time) {
      reject("Invalid data");
      return false;
    }
    const result = await store.modifyReserve(id, parkingSpot, time);
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
