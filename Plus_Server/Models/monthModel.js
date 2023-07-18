const mongoose = require("mongoose");

function thisMonth() {
  var now = new Date().getMonth()+1;
  return now;
}

const MonthSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    
  },
  mon: {
    type: String,
    require,
    default: thisMonth().toString()
  },
  year: {
    type: String,
    require,
    default: new Date().getFullYear().toString(),
  },
  max_expenses: {
    type: Number,
    require,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expenses",
    },
  ],
  incomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Income",
    },
  ],
  sum_expenses:{
    type:Number,
    require,
    default:0
  },
  sum_incomes:{
    type:Number,
    require,
    default:0
  }
});

module.exports = mongoose.model("Month", MonthSchema);
