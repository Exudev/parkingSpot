const Model = require ('./model')

function addUserModerator(userModerator){
    const newUserModerator = new Model(userModerator);
    return newUserModerator.save();
};

async function seeAllUsersModerator(){

    try {
        const populated =  await Model.find().populate('user','email');
        return populated;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function deleteUserModerator(id){
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: seeAllUsersModerator,
    add: addUserModerator,
    delete: deleteUserModerator,
}

// try {
//     let filter = {};
//   //   if (brand !== null) {
//   //     filter = { brand: brand };
//   //   }
//     const populated = await Model.find(filter).populate('brand','brand');
//     return populated;
//   } catch (error) {
//       console.log(error);
//     throw error;
//   }