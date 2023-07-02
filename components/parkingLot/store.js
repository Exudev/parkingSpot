const Model = require('./model')

async function addParkingLot(parkingLot){

    const newParkingLot = new Model(parkingLot);
    return newParkingLot.save();
};

async function getParkingLots() {
    
    try {
     
      const populated = await Model.find();
      return populated;
    } catch (error) {
        console.log(error);
      throw error;
    }
  }
  

function deleteParkingLot(id){
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: getParkingLots,
    add: addParkingLot,
    delete: deleteParkingLot,
}