const store = require("./store");
function addNewParking(parkingLot, parking, basePrice){
    return new Promise((resolve, reject)=> {
        if(!parkingLot||!parking||!basePrice){
            console.error(
                "[messageController] There is missing Data"
              );
              return reject("The provided data was incorrect");
        }
        const parkingObj = {
            
            parkingLot: parkingLot,
            parking:  parking,
            basePrice:  basePrice,
        };
        store.add(parkingObj);
        console.log(parkingObj);
        resolve(parkingObj);
    })
}
function deleteParking(id){
    return new Promise((resolve, reject) => {
        if (!id) {
          reject("Id invalido");
          return false;
        }
        store
          .delete(id)
          .then(() => {
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

module.exports = {
    addNewParking: addNewParking,
    deleteParking: deleteParking,
    getParking: getParking,
}