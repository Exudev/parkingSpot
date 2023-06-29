const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
  email: { type: String, require: true },
  password: {
    type: String,
    required: true,
  },
  rol: { type: String },
});

const model = mongoose.model('User', mySchema);
module.exports = model;
