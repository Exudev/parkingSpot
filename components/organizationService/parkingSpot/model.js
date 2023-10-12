const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
  user:{ type: Schema.ObjectId,
  ref: 'UserDriver', },
  vehicle:{type: String,
   required: true,   
  },
  parking: {type: Schema.ObjectId,
    ref: 'Parking',   
  },
  
  StartTime: Date,
  EndTime: Date,
});

const model = mongoose.model('ParkingSpot', mySchema);
module.exports = model;