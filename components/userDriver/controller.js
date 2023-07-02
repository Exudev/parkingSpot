const store = require("./store");

function addNewUserDriver(user, firstName, lastName, birthDate){
    return new Promise((resolve, reject)=> {
        if(!user||!firstName||!lastName||!birthDate){
            console.error(
                "[messageController] Theres missing data selected"
              );
              return reject("The provided data was incorrect");
        }
        const userDriver = {
            user: user,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
        };
        store.add(userDriver);
        console.log(userDriver);
        resolve(userDriver);
    })
}
function deleteUserDriver(id){
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

function getUserDriverList(){
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
} 

module.exports = {
    addNewUserDriver: addNewUserDriver,
    deleteUserDriver: deleteUserDriver,
    getUserDriverList: getUserDriverList,
}