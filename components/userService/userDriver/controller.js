// #region Imports
const store = require("./store");
const nado = require('../../../mail/emailTemplates/activateAccountTemplate');
const emailSender = require('../../../mail/emailSender');
const token = require('../../tokenService/token');
const userStore = require('../user/store.js');

// #endregion
async function addNewUserDriver(user, firstName, lastName, phone){
    return new Promise(async (resolve, reject)=> {
        if(!user||!firstName||!lastName||!phone){
            console.error(
                "[messageController] Theres missing data selected"
              );
              return reject("The provided data was incorrect");
        }
        const userDriver = {
          user: user,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
        }; 
        const secretValue = await token.createActivateAccountToken(user);
        const newTemplate = nado(firstName,lastName,secretValue);
        try {
        await store.add(userDriver);
        const userFound = await userStore.get(user); 
        console.log(userFound[0].email);
        emailSender.sendEmail(userFound[0].email,"Welcome to Parking-Spot",newTemplate);
        console.log(userDriver);
        resolve(userFound);
        } catch (error) {
          reject(error);
        }
    });
}
async function deleteUserDriver(id){
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

async function updateUserInfo(userDriverId, firstName, lastName, phone){
  return new Promise(async (resolve, reject)=> {
    if(!userDriverId||!firstName||!lastName||!phone){
        console.error(
            "[messageController] Theres missing data selected"
          );
          return reject("The provided data was incorrect");
    }
    try {
      //change add for actual function
  const userDriverUpdated =  await store.update(userDriverId, firstName, lastName, phone);
    console.log(userDriverUpdated);
    resolve(userDriverUpdated);
    } catch (error) {
      reject(error);
    }
});
}

function getUserDriverList(){
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
} 

function getUserDriverInfo(){

}


module.exports = {
    addNewUserDriver: addNewUserDriver,
    updateUserDriver: updateUserInfo,
    deleteUserDriver: deleteUserDriver,
    getUserDriverList: getUserDriverList,
    getUserDriverInfo: getUserDriverInfo,
}