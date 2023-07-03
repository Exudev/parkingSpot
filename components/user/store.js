const Model = require ('./model')

async function addUser(user){
    try {
        const userFound = await Model.findOne({ email: user.email });
        if(userFound)
        {
            return { success: false, message: 'User Already exists' };
            
        }
    const newUser = new Model(user);
    return newUser.save();
    } catch (error) {
        console.error('Error occurred during creating account:', error);
      throw { success: false, message: 'An error occurred during Sign up' };
    }
    
};

async function login(username, password) {
    try {
      const userFound = await Model.findOne({ email: username });
      if (!userFound) {
        // User not found
        return { success: false, message: 'Invalid username or password' };
      }
      if (userFound.password != password) {
        // Invalid password
        return { success: false, message: 'Invalid username or password' };
      }
      // Login successful
      return { success: true, message: 'Login successful', user: userFound };
    } catch (error) {
      // Handle any errors
      console.error('Error occurred during login:', error);
      throw { success: false, message: 'An error occurred during login' };
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
    delete: deleteUser,
    login: login,
}