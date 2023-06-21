const Model = require ('./model')

function addModel(model){
    const newModel = new Model(model);
    return newModel.save();
};

async function getModels(brand) {
    
    try {
      let filter = {};
    //   if (brand !== null) {
    //     filter = { brand: brand };
    //   }
      const populated = await Model.find(filter).populate('brand','brand');
      return populated;
    } catch (error) {
        console.log(error);
      throw error;
    }
  }
  

function deleteModel(id){
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: getModels,
    add: addModel,
    delete: deleteModel,
}