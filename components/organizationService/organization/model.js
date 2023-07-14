const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
  organizationName: { type: String, require: true },
  coodernates: {
    type: String,
    required: true,
  },
  organizationOwner: { type: String, require: true },
});

const model = mongoose.model('Organization', mySchema);
module.exports = model;
