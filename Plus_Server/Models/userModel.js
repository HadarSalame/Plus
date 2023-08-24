const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [15, "name can not be more than 15 characters"],
  },
  lastName: {
    type: String,
    required: [true, "must provide last name"],
    trim: true,
    maxlength: [15, "name can not be more than 15 characters"],
  },
  phone: {
    type: String,
    require,
    maxlength: [12, "phone number can not be more then 12 numbers"],
  },
  mail: {
    type: String,
    require,
  },
  password: {
    type: String,
    require,
    maxlength: [12, "The password must contain 8 to 12 characters"],
  },
  monthly:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Month",
  }],
  targets:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Target'
  }]
});

module.exports = mongoose.model("User", UserSchema);
