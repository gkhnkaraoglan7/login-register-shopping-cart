const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserShema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

///////////////////////////Tablo Adı "User" olan
                        //    |     ///
const User = mongoose.model("User", UserShema);

module.exports = User;