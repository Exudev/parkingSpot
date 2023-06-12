const Model = require ('./model')

function addColor(color){
    const newColor = new Model(color);
    return newColor.save();
};

async function seeAllColors(){
    const colors = await Model.find();
    return colors;
}

function deleteColor(id){
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: seeAllColors,
    add: addColor,
    delete: deleteColor,
}