const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
    model:{
        type: Schema.ObjectId,
        ref: 'vModel', 
    }, 
    model: {type: String, require: true},
            });


const model = mongoose.model('Vehicle', mySchema);
module.exports = model;
