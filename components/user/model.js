const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const mySchema = new Schema({
  email: { type: String, require: true },
  password: {
    type: String,
    required: true,
    set: (plainPassword) => {
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
      return hashedPassword;
    },
  },
  rol: { type: String },
});

const model = mongoose.model('User', mySchema);
module.exports = model;
