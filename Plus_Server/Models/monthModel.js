const mongoose = require("mongoose");

// const m={
//    1:'January',
//    2:'February ',
//    3:'March ',
//    4:'April ',
//    5:'May ',
//    6:'June',
//    7:'July ',
//    8:'August ',
//    9:'September',
//    10:'October ',
//    11:'November',
//    12:'December',

// }

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
});

module.exports = mongoose.model("Month", MonthSchema);
