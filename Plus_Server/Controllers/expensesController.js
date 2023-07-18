const Expenses = require("../Models/expensesModel");
const Month = require("../Models/monthModel");

const createExpense = async (req, res) => {
  const expense = req.body;
  try {
    let new_expense = await new Expenses(expense);
    await new_expense.save();
    const monthId = new_expense.month;
    const exp_sum = new_expense.ex_sum;
    const addExpenseToMonth = await Month.findOne({ _id: monthId });
    const sum = addExpenseToMonth.sum_expenses + exp_sum;
    addExpenseToMonth.expenses.push(new_expense);
    await Month.findByIdAndUpdate(monthId, addExpenseToMonth, {
      new: true,
    });
    await Month.findOneAndUpdate(addExpenseToMonth._id, { sum_expenses: sum });
    res.status(201).json({ message: "Added successfully", new_expense });
  } catch {
    res.status(401).json({ message: "Cannot create an object" });
  }
};

const getAllExpense = async (req, res, next) => {
  try {
    await Expenses.find({ month: req.params.id }).then((e) => {
      res.status(200).json(e);
    });
  } catch {
    res.status(401).json({ message: "Cannot create an object" });
  }
};

const updateExpense = async (req, res) => {
  try {
    await Expenses.updateOne({ _id: req.params.id }, req.body).then((e) => {
      res.status(200).json(e);
    });
  } catch {
    res.status(401).json({ message: "Cannot update the object" });
  }
};

const getExpense = async (req, res) => {
  try {
    await Expenses.findById({ _id: req.params.id }).then((e) => {
      res.status(200).json(e);
    });
  } catch {
    res.status(401).json({ message: "Cannot find the object" });
  }
};

const deleteExpense = async (req, res, next) => {
  const { id: expenseID } = req.params;
  const expense = await Expenses.findOne({ _id: expenseID });
  const minus = expense.ex_sum;
  const themonth = await Month.findById(expense.month);
  const month = await Month.updateMany(
    { expenses: expenseID },
    { $pull: { expenses: expenseID } }
  );
  const sum = themonth.sum_expenses - minus;
  await Month.findOneAndUpdate(themonth._id, { sum_expenses: sum });
  await Expenses.findOneAndDelete({ _id: expenseID });
  if (!expense) {
    res.status(401).json({ message: "Cannot delete the object" });
  }
  res.status(200).json({ expense });
};

module.exports = {
  createExpense,
  getAllExpense,
  updateExpense,
  getExpense,
  deleteExpense,
};
