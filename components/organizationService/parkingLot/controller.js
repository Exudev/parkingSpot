const store = require("./store");
function addNewParkingLot(name, totalParking, description){
    return new Promise((resolve, reject)=> {
        if(!name||!totalParking||!description){
            console.error(
                "[messageController] Some of the data is missing"
              );
              return reject("The provided data was incorrect");
        }
        const parkingLot = {
            name:  name,
            totalParking: totalParking,
            description:  description,
        };
        store.add(parkingLot);
        console.log(parkingLot);
        resolve(parkingLot);
    })
}
function deleteParkingLot(id){
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

function getParkingLot(){
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
} 

module.exports = {
    addNewParkingLot: addNewParkingLot,
    deleteParkingLot: deleteParkingLot,
    getParkingLot: getParkingLot,
}