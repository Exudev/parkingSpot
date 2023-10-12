const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Parking = require('../parking/model')

const mySchema = new Schema({
    organization: {type: Schema.ObjectId,
      ref: 'Organization', },
    name:  {type: String, require: true},
    totalParking:  {type: Number, require: true},
    description:  {type: String, require: true},
    latitude :{
        type: String,
        required: true,
      },
      longitude: {
        type:String ,
        required:true,
      },
});
mySchema.methods.updateTotalParkingCount = async function () {
  const count = await Parking.countDocuments({ parkingLot: this._id });
  this.totalParking = count;
  await this.save();
};

const model = mongoose.model('ParkingLot', mySchema);
module.exports = model; 