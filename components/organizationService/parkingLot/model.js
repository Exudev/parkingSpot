const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
    organization: {type: String, require: true},
    latitude :{
        type: String,
        required: true,
      },
      longitude: {
        type:String ,
        required:true,
      },
      latitudeDelta:{
        type:String ,
        required:true,
      },
      longitudeDelta:{
        type:String ,
        required:true,
      },
    name:  {type: String, require: true},
    totalParking:  {type: Number, require: true},
    description:  {type: String, require: true},
});

const model = mongoose.model('ParkingLot', mySchema);
module.exports = model; 