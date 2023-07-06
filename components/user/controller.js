const store = require("./store");
const chalk = require('chalk');
const warning = chalk.red;
const validation = require("../../shared/validations");
function addNewUser(email, password, rol){
    return new Promise((resolve, reject)=> {
        if(!email||!password||!rol){
            console.log(warning(
                "[messageController] Theres no user or password or role selected"
              ));
              return reject("The provided data was incorrect");
        }
        if (!validation.validMail(email))
        {
          console.log(warning("[messageController] Invalid mail format"));
          return reject("You need to provide a valid email");
        }
        if (store.exists(email))
        {
          console.log(warning("[messageController] Exists"));
          return reject("Exists");
        }

        const user = {
            email: email,
            password: password,
            rol: rol,
        };
        store.add(user)
         .then((result) => {
            console.log(result);
            resolve(result);
         })
        .catch((error) => {
          reject(error);
        })
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
// function changePassword(){

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
    deleteUser,
    getUser,
    login,
}