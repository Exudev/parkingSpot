// #region Imports
const store = require("./store");
const chalk = require('chalk');
const warning = chalk.red;


// #endregion

//add organization 
function addNewOrganization(organizationName, latitude,longitude ,longitudeDelta, latitudeDelta,  organizationOwner){
    return new Promise(async (resolve, reject)=> {
        if(!organizationName||!longitudeDelta||!latitudeDelta||!organizationOwner||!longitude||!latitude){
            console.log(warning(
                "[messageController] Theres missing information, that needs to be field"
              ));
              return reject("The provided data was incorrect");
        }
         const organization = {
            organizationName: organizationName,
            latitude: latitude,
            longitude: longitude,
            latitudeDelta : latitudeDelta ,
            longitudeDelta : longitudeDelta ,
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
//delete organization
function deleteOrganization(id){
    return new Promise((resolve, reject) => {
        if (!id) {
          console.log(warning(
            "[messageController] The provided Id was invalid"
          ));
          reject("invalid Id");
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
// this brings the name and coordenates of all the organization, if given Id, only brings one
function bringNamesandCoordenates(){
return new Promise((resolve,reject) => {
  resolve(store.getAllCoordenates());
})
}
//This brings all the information about all the organization
function getAllOrganization(){
  return new Promise((resolve, reject) => {
    const result = store.getAll();

    if (result) {
      resolve(result);
    } else {
      reject("Failed to retrieve organizations.");
    }
  });
}

function getOrganization(id) {
  return new Promise((resolve, reject) => {
    store.getOne(id)
      .then(organization => {
        resolve(organization);
      })
      .catch(error => {
        console.error("Error occurred while getting organization:", error);
        reject(error);
      });
  });
}

module.exports = {
    addNewOrganization: addNewOrganization,
    deleteOrganization: deleteOrganization,
    getAllOrganization: getAllOrganization,
    getOrganization: getOrganization,
    info: bringNamesandCoordenates,
}