const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: string,
    totalParking: number,
    inUsedParking: number,
    description: string,
});

const model = mongoose.model('ParkingLot', mySchema);
module.exports = model;