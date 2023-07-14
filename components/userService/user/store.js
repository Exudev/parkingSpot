const Model = require ('./model');
const { ObjectId } = require('mongodb');

async function addUser(user){
    try {
    const newUser = new Model(user);
    return newUser.save();;
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
      if (userFound.password !== password) {
        // Invalid password
        return { success: false, message: 'Invalid username or password' };
      }
      // Login successful
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
    list: seeAllUsers,
    add: addUser,
    get: getUser,
    delete: deleteUser,
    login: login,
    exists: checkUserExists,
}