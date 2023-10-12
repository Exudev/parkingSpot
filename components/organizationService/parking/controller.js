const store = require("./store");
const ParkingLot = require('../parkingLot/model')
function addNewParking(parkingLot, parking, availability){
    return new Promise(async (resolve, reject)=> {
        if(!parkingLot||!parking||!availability){
            console.error(
                "[messageController] There is missing Data"
              );
              return reject("The provided data was incorrect");
        }
        const parkingObj = {
            
            parkingLot: parkingLot,
            parking:  parking,
            availability:  availability,
        };
        const parkingLotFound = await ParkingLot.findById(parkingLot);
        await parkingLotFound.updateTotalParkingCount();
        store.add(parkingObj);
        console.log(parkingObj);
        resolve(parkingObj);
    })
}
function deleteParking(id){
    return new Promise(async (resolve, reject) => {
        if (!id) {
          reject("Id invalido");
          return false;
        }
        store
          .delete(id)     
          .then(async () => {
           const  res = await getParkingbyId(id)
           console.log(res)
           const parkingLotFound =  ParkingLot.findById(res.parkingLot);
           await parkingLotFound.updateTotalParkingCount();
           resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
}

function getParking(){
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
} 

function getParkingbyId(id){
  return new Promise((resolve, reject) => {
    resolve(store.get(id));
  });
}

function getParkingbyParkingLot(parkingLotId){
  return new Promise((resolve, reject) => {
    resolve(store.listByOrg(parkingLotId));
  });
} 

module.exports = {
    addNewParking: addNewParking,
    deleteParking: deleteParking,
    getParking: getParking,
    getParkingsOrg: getParkingbyParkingLot,
}