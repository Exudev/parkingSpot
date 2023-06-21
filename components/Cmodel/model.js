const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
    brand:{
        type: Schema.ObjectId,
        ref: 'vBrand', 
    }, 
    model: {type: String, require: true},
            });

const model = mongoose.model('vModel', mySchema);
module.exports = model;
