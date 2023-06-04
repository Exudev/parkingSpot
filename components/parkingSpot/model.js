const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
  user:{ type: String, require: true },
  parkingSpot: { type: String, require: true },
  time: Date,
});

const model = mongoose.model('ParkingSpot', mySchema);
module.exports = model;