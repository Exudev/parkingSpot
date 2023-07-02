const Model = require ('./model')

function addUserDriver(userDriver){
    const newUserDriver = new Model(userDriver);
    return newUserDriver.save();
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
}