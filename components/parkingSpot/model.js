const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const mySchema = new Schema({
    user: user,
    parkingSpot: parkingSpot,
    time: new Date()
})