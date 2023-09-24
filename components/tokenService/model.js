const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
  type: { type: String, required: true },
  token :{
    type: String,
    required: true,
  },
  user: {
    type:String ,
    required:true,
  },
  DateGenerate:{
    type:String ,
    required:true,
  },
  ExpirationDate:{
    type:String ,
    required:true,
  },
});

const model = mongoose.model('Token', mySchema);
module.exports = model;
