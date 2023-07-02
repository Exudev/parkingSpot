const Model = require ('./model')

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
  

function deleteParking(id){
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: getParking,
    add: addParking,
    delete: deleteParking,
}