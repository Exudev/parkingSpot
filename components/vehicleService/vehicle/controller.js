const store = require("./store");
function addVehicle( model, color, owner, year, plate) {
  return new Promise((resolve, reject) => {
    if ( !model || !color || !owner || !year || !plate) {
      console.error(
        "[messageController] Theres missing Data"
      );
      return reject("The provided data was incorrect");
    }
    // prueba
    const vehicle = {
      model: model,
      color: color,
      owner: owner,
      year: year,
      plate: plate,
    };
    store.add(vehicle);
    console.log(vehicle);
    resolve(vehicle);
  })
}
function deleteVehicle(id) {
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

function getVehicle() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
}

function getVehiclesByUser(id){
  return new Promise((resolve, reject) => {
    resolve(store.listByUser(id));
  });
}
module.exports = {
  addVehicle: addVehicle,
  deleteVehicle: deleteVehicle,
  getVehicle: getVehicle,
  getVehiclesByUser: getVehiclesByUser
}