const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
            brand: {type: String, require: true},
            });

const model = mongoose.model('vBrand', mySchema);
module.exports = model;
