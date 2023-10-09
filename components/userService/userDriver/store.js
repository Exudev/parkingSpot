const Model = require ('./model')

async function addUserDriver(userDriver){
    const newUserDriver = new Model(userDriver);
    return newUserDriver.save();
};

async function updateUserDriver(userDriverId,firstName,lastName, phone){
    const foundUserDriver = await Model.findOne({
        _id: userDriverId
    });
    foundUserDriver.firstName = firstName;
    foundUserDriver.lastName = lastName;
    foundUserDriver.phone = phone;
    const updatedUserDriver= await foundUserDriver.save();
    return updatedUserDriver;
};

async function seeAllUsersDriver(){
    try {
        const usersDrivers = await Model.find().populate('user','email');
    return usersDrivers;
    } catch (error) {
    }
}


function deleteUserDriver(id){
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: seeAllUsersDriver,
    add: addUserDriver,
    delete: deleteUserDriver,
    update: updateUserDriver, 
}