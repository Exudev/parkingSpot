const Model = require ('./model')

function addUser(user){
    const newUser = new Model(user);
    return newUser.save();
};

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
}