// #region Imports
const store = require("./store");
const chalk = require('chalk');
const warning = chalk.red;
const validation = require("../../../shared/validations");
// #endregion

function addNewOrganization(organizationName, coodernates, organizationOwner){
    return new Promise(async (resolve, reject)=> {
        if(!organizationName||!coodernates||!organizationOwner){
            console.log(warning(
                "[messageController] Theres no user or password  selected"
              ));
              return reject("The provided data was incorrect");
        }
         const organization = {
            organizationName: organizationName,
            coodernates: coodernates,
            organizationOwner: organizationOwner,
        };
        store.add(organization)
         .then((result) => {
          // emailSender.sendEmail(email,"Welcome to Parking-Spot",newTemplate);
            resolve(result);
         })
        .catch((error) => {
          reject(error);
        })
    })
}
function deleteOrganization(id){
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
function bringNamesandCoordenates(){
return new Promise((resolve,reject) => {
  resolve(store.namesAndCoordenates());
})
}
function getOrganization(){
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
} 

module.exports = {
    addNewOrganization: addNewOrganization,
    deleteOrganization: deleteOrganization,
    getOrganization: getOrganization,
    info: bringNamesandCoordenates,
}