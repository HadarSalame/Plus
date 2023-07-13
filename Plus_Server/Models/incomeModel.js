const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    month: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Month",
      },
    name:{
        type:String,
        require
    },
    sum:{
        type:Number,
        require,
    },
    in_fixed:{
        type:Boolean,
        default:true
    }

})

module.exports = mongoose.model('Income',IncomeSchema)