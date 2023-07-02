const Model = require ('./model')

async function addVehicle(vehicle){

    const newVehicle = new Model(vehicle);
    return newVehicle.save();
};

async function getVehicle() {
    
    try {
     
      const populated = await Model.find()
      .populate('model','model')
      .populate('color','color')
      .populate('owner','firstName')
      ;
      return populated;
    } catch (error) {
        console.log(error);
      throw error;
    }
  }
  

function deleteVehicle(id){
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: getVehicle,
    add: addVehicle,
    delete: deleteVehicle,
}