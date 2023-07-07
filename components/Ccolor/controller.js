const store = require("./store");
function addNewColor(name){
    return new Promise((resolve, reject)=> {
        if(!name){
            console.error(
                "[messageController] No color was provided"
              );
              return reject("The provided data was incorrect");
        }
        const color = {
            color: name,
        };
        store.add(color);
        console.log(color);
        resolve(color);
    })
}
function deleteColor(id){
    return new Promise((resolve, reject) => {
        if (!id) {
          reject("invalid-id");
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

function getColor(){
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
} 

module.exports = {
    addNewColor,
    deleteColor,
    getColor,
}