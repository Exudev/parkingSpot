const store = require("./store");
function addNewModel(brand, name){
    return new Promise((resolve, reject)=> {
        if(!name||!brand){
            console.error(
                "[messageController] No brand or model was provided"
              );
              return reject("The provided data was incorrect");
        }
        const model = {
            brand: brand,
            model: name,
        };
        store.add(model);
        console.log(model);
        resolve(model);
    })
}
function deleteModel(id){
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

function getModel(filterBrand){
  return new Promise((resolve, reject) => {
    resolve(store.list(filterBrand));
  });
} 

module.exports = {
    addNewModel: addNewModel,
    deleteModel: deleteModel,
    getModel: getModel,
}