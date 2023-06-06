const store = require("./store");
function addNewUser(email, password, rol){
    return new Promise((resolve, reject)=> {
        if(!email||!password||!rol){
            console.error(
                "[messageController] Theres no user or park or time selected"
              );
              return reject("The provided data was incorrect");
        }
        const user = {
            email: email,
            password: password,
            rol: rol,
        };
        store.add(user);
        console.log(user);
        resolve(user);
    })
}
function deleteUser(id){
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

function getUser(){
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
} 

module.exports = {
    addNewUser,
    deleteUser,
    getUser,
}