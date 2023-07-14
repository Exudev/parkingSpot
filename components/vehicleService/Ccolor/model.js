const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const mySchema = new Schema({
            color: {type: String, require: true},
            });

const model = mongoose.model('vColor', mySchema);
module.exports = model;
