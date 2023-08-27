const Model = require('./model')

const { ObjectId } = require('mongodb');
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

  async function getParkingsByOrganization(id)
  {
    try {
      const objectId = new ObjectId(id)
      const parkings = await Model.find({organization: objectId})
      return parkings
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
    getParkingsByOrg: getParkingsByOrganization
}