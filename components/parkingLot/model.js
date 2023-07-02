const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
    name:  {type: String, require: true},
    totalParking:  {type: Number, require: true},
    description:  {type: String, require: true},
});

const model = mongoose.model('ParkingLot', mySchema);
module.exports = model; 