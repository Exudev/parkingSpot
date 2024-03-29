const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'User', 
    },  
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    phone: {type: String, require: true},
});

const model = mongoose.model('UserDriver', mySchema);
module.exports = model;
