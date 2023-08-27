const Model = require ('./model')
const { ObjectId } = require('mongodb');
async function addParking(parking){

    const newParking = new Model(parking);
    return newParking.save();
};

async function getParking() {
    
    try {
     
      const populated = await Model.find().populate('parkingLot','name');
      return populated;
    } catch (error) {
        console.log(error);
      throw error;
    }
  }
  
  
async function getParkingbyParkingLot(id) {
    
  try {
    const objectId = new ObjectId(id)
    const parkingLots = await Model.find({parkingLot: objectId})
    return parkingLots
  } catch (error) {
      console.log(error);
    throw error;
  }
}

function deleteParking(id){
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: getParking,
    listByOrg: getParkingbyParkingLot,
    add: addParking,
    delete: deleteParking,
}