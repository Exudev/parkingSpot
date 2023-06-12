const Model = require ('./model')

function addBrand(brand){
    const newBrand = new Model(brand);
    return newBrand.save();
};

async function seeAllBrands(){
    const brands = await Model.find();
    return brands;
}

function deleteBrand(id){
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: seeAllBrands,
    add: addBrand,
    delete: deleteBrand,
}