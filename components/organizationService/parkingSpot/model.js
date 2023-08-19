const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
  user:{ type: Schema.ObjectId,
  ref: 'UserDriver', },
  parking: {type: Schema.ObjectId,
    ref: 'Parking',   },//Parqueo
  StartTime: Date,
  EndTime: Date,
});

const model = mongoose.model('ParkingSpot', mySchema);
module.exports = model;