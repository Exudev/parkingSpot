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

  async function getParkingLotsByOrganization(id)
  {
    try {
      const objectId = new ObjectId(id)
      const parkingLots = await Model.find({organization: objectId})
      return parkingLots
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
    getParkingsByOrg: getParkingLotsByOrganization
}