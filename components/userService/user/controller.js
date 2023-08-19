// #region Imports
const store = require("./store");
const chalk = require('chalk');
const warning = chalk.red;
const validation = require("../../../shared/validations");
// #endregion

function addNewUser(email, password){
    return new Promise(async (resolve, reject)=> {
        if(!email||!password){
            console.log(warning(
                "[messageController] Theres no user or password  selected"
              ));
              return reject("The provided data was incorrect");
        }
        let strongPassword = validation.validPassword(password);
        if (strongPassword === false)
            {
              console.log(warning("[messageController] Invalid password"));
              return reject("You need to provide a better password");
            }
        if (!validation.validMail(email))
        {
          console.log(warning("[messageController] Invalid mail format"));
          return reject("You need to provide a valid email");
        }
        
        let exists;
        store.exists(email)
          .then((result) => {
            exists = result;
            if (exists === true){
          console.log(warning("[messageController] User Exists"));
          return reject("Exists");
         } const user = {
            type: 'user',
            email: email,
            password: password,
            active: false ,
        };
        store.add(user)
         .then((result) => {
          // emailSender.sendEmail(email,"Welcome to Parking-Spot",newTemplate);
            resolve(result);
         })
        .catch((error) => {
          reject(error);
        })
    })
          })
       
}
function getInfoAndCars(email){
  return new Promise(async (resolve, reject)=> {
      if(!email){
          console.log(warning(
              "[messageController] Theres no user selected"
            ));
            return reject("The provided data was incorrect");
      }
   
    
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

function getUsers(){
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
} 

function getUser(userId){
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
  
} 
function changePassword(email, oldPassword, newPassword){

}
// function forgotPassword(email){

// }
function login(email, password) {
  const warning = chalk.red;
  return new Promise((resolve, reject) => {
    if (!email || !password) {
      console.log(warning("[messageController] There is missing data"));
      reject("The provided data was incorrect");
      return;
    }

    const info = {
      email: email,
      password: password,
    };

    store.login(info.email, info.password)
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
    addNewUser,
    changePassword,
    getInfoAndCars,
    // forgotPassword,
    deleteUser,
    getUser,
    getUsers,
    login,
}