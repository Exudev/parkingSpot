// #region Imports
const store = require("./store");
const _validation = require("../../../shared/validations");
const nado = require('../../../mail/emailTemplates/activateAccountTemplate');
const emailSender = require('../../../mail/emailSender');
const token = require('../../tokenService/token');
const userStore = require('../user/store.js')
// #endregion
async function addNewUserDriver(user, firstName, lastName, birthDate){
    return new Promise(async (resolve, reject)=> {
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
        const tokenLink = token.createTokenLink("Hola profe",token.createToken(user))
        const newTemplate = nado(firstName,lastName,tokenLink);
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

function getUserDriverInfo(){

}

function getUserDriverCars(){
  
}
module.exports = {
    addNewUserDriver: addNewUserDriver,
    deleteUserDriver: deleteUserDriver,
    getUserDriverList: getUserDriverList,
    getUserDriverCars: getUserDriverCars,
    getUserDriverInfo: getUserDriverInfo,
}