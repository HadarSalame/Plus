const mongoose = require("mongoose");

const TargetSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  target_name: {
    type: String,
    require,
  },
  target_start_date:{
   type: Date, 
   default: new Date().toISOString().split("T")[0]
  },
  target_date:{
    type:Date,
    require
  },
  target_sum:{
    type:Number,
    require
  },
  sucsses:{
    type:Boolean,
    default:false,
    require
  }
});

module.exports = mongoose.model("Target", TargetSchema);
