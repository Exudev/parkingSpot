const store = require("./store");
function addNewBrand(name){
    return new Promise((resolve, reject)=> {
        if(!name){
            console.error(
                "[messageController] No brand was provided"
              );
              return reject("The provided data was incorrect");
        }
        const brand = {
            brand: name,
        };
        store.add(brand);
        console.log(brand);
        resolve(brand);
    })
}
function deleteBrand(id){
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

function getBrand(){
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
} 

module.exports = {
    addNewBrand: addNewBrand,
    deleteBrand: deleteBrand,
    getBrand: getBrand,
}