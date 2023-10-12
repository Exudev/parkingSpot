const store = require("./store");

function addNewUserModerator(user, firstName, lastName, organizationId){
    return new Promise((resolve, reject)=> {
        if(!user||!firstName||!lastName||!organizationId){
            console.error(
                "[messageController] Theres missing data selected"
              );
              return reject("The provided data was incorrect");
        }
        const userModerator = {
            user: user,
            firstName: firstName,
            lastName: lastName,
            organizationId: organizationId,
        };
        store.add(userModerator);
        console.log(userModerator);
        resolve(userModerator);
    })
}
function deleteUserModerator(id){
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

function getUserModeratorList(){
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
} 

module.exports = {
    addNewUserModerator: addNewUserModerator,
    deleteUserModerator: deleteUserModerator,
    getUserModeratorList: getUserModeratorList,
}