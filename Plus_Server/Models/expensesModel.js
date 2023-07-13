const mongoose = require("mongoose");


const ExpensesSchema = new mongoose.Schema({
    month:{
        type:mongoose.Schema.Types.ObjectId,ref:'Month'
    },
    date:{
        type:Date,
        require,
        default: new Date().toISOString().split("T")[0]
    },
    name:{
        type:String,
        require
    },
    category:{
        type:String,
        require
    },
    ex_fixed:{
        type:Boolean,
        default: false,
        
    },
    ex_sum:{
        type:Number,
        require
    }


})
module.exports = mongoose.model('Expenses', ExpensesSchema)
