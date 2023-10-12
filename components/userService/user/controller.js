// #region Imports
const store = require("./store");
const chalk = require('chalk');
const warning = chalk.red;
const bcrypt = require('bcrypt');
const nado = require('../../../mail/emailTemplates/forgotPassword');
const emailSender = require('../../../mail/emailSender');
const token = require('../../tokenService/token');

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
        
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
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
            password: hashedPassword,
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



function activateUser(token, userId){
  return new Promise(async (resolve, reject)=> {
    if(!token){
        console.log(warning(
            "[messageController] There where no token sended"
          ));
          return reject("The provided  was incorrect");
    }
      resolve(store.activate(token, userId));
  });
}

function getInfoAndCars(id){
  return new Promise(async (resolve, reject)=> {
      if(!id){
          console.log(warning(
              "[messageController] Theres no user selected"
            ));
            return reject("The provided data was incorrect");
      }
        resolve(store.info(id));
    });
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

function getUser(id){
  return new Promise((resolve, reject) => {
    resolve(store.get(id));
  });
  
} 
async function forgotPassword(email ){
  return new Promise(async (resolve, reject) => {
    const secretValue = await token.createForgotPasswordToken(email);
    const newTemplate = nado(secretValue);
    emailSender.sendEmail(email,"oh my, oh my, u forgot ur password",newTemplate);
  });
}

async function setNewPassword(token, email, password, confirmPassword){
  
  return new Promise(async (resolve, reject) => {
    if(password !== confirmPassword){
    console.error(
      "[messageController] The password didnt match"
    );
    return reject("The password didnt match");
  }

  let strongPassword = validation.validPassword(password);
        if (strongPassword === false)
            {
              console.log(warning("[messageController] Invalid password"));
              return reject("You need to provide a better password");
            }
        
        
    resolve(store.changePasswordToken(token, email, password));
  });
}

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
    getInfoAndCars,
    forgotPassword,
    setNewPassword,
    deleteUser,
    getUser,
    getUsers,
    login,
    activateUser,
}