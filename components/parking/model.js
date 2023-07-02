const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
    parkingLot:{
        type: Schema.ObjectId,
        ref: 'ParkingLot', 
    }, 
    parking: {type: String, require: true},
    basePrice: {type: Number, require: true},
            });

const model = mongoose.model('Parking', mySchema);
module.exports = model;
