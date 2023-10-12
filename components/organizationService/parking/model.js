const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
    parkingLot:{
        type: Schema.ObjectId,
        ref: 'ParkingLot', 
    }, 
    parking: {type: String, require: true},
    availability: {type: String, require: true},
            });

const model = mongoose.model('Parking', mySchema);
module.exports = model;
