const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'User', 
    },  
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    organizationId: {type: Schema.ObjectId,
        ref: 'Organization',   }

});

const model = mongoose.model('userModerator', mySchema);
module.exports = model;
