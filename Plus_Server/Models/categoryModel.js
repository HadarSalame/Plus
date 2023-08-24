const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    month: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Month",
      },
    name:{
        type:String,
        require
    },
    total:{
        type:Number,
        require,
    }

})

module.exports = mongoose.model('Category',CategorySchema)