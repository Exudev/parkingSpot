const Model = require ('./model');
const ModelUserDriver = require ('../userDriver/model')
const ModelVehicle = require ('../../vehicleService/vehicle/model')
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');


async function addUser(user){
    try {
    const newUser = new Model(user);
    return newUser.save();
    } catch (error) {
      console.error('Error occurred during creating account:', error);
      return false;
    }
};

async function getUser(userId){
try {
  const userFound = await Model.find({ _id: new ObjectId(userId) }).exec();
  return userFound;
} catch (error) {
  console.error('Error occurred during searching account:', error);
}
}

async function getUserInfo(userId)
{
  try {
    const userDriverFound = await ModelUserDriver.find({user: userId}).exec();
    const userDriverId = userDriverFound.user;
    const carFound = await  ModelVehicle.find({owner: userDriverId}).exec();
    const res = {
      userDriverFound,
      carFound
    }
    return res
  } catch (error) {
    console.error('Error occurred during searching account:', error);
}
  }

// async function getUser(userId){
//   try {
//     const userInfoFound = await Model.find({ _id: new ObjectId(userId) }).exec();
//     const cars = await Model.find
//     return userFound;
//   } catch (error) {
//     console.error('Error occurred during searching account:', error);
//   }
//   }

async function checkUserExists(email) {
  try {
    const userFound = await Model.findOne({ email: email });
  if(userFound)
  {
    return true;
  }
 return false;
  } catch (error) {
    console.error('Error occurred during searching account:', error);
  }
  
}

async function login(username, password) {
    try {
      const userFound = await Model.findOne({ email: username });
      if (!userFound) {
        // User not found
        return { success: false, message: 'Invalid username or password' };
      }
      
      const passwordMatch = bcrypt.compareSync(password, userFound.password);
      // Login successful
      if(!passwordMatch)
      {
        return { success: false, message: 'Invalid username or password' };
      }
      return { success: true, message: 'Login successful', user: userFound };
    } catch (error) {
      // Handle any errors
      console.error('Error occurred during login:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  }
  
async function seeAllUsers(){
    const users = await Model.find();
    return users;
}

function deleteUser(id){
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    info:getUserInfo,
    list: seeAllUsers,
    add: addUser,
    get: getUser,
    delete: deleteUser,
    login: login,
    exists: checkUserExists,
}