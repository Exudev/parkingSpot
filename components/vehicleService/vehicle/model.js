const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
    name: {type: String, require: true},
    model:{
        type: Schema.ObjectId,
        ref: 'vModel', 
    }, 
    color:{
        type: Schema.ObjectId,
        ref: 'vColor', 
    }, 

    owner:{
        type: Schema.ObjectId,
        ref: 'userDriver', 
    }, 
    year: {type: Date, require: true},
    plate:  {type: String, require: true},
    description: {type: String, require: true},
            });


const model = mongoose.model('Vehicle', mySchema);
module.exports = model;
