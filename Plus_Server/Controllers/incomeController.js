const Income = require("../Models/incomeModel");
const Month = require("../Models/monthModel");

const createIncome = async (req, res) => {
  const income = req.body;
  console.log("income ", income);
  try {
    let new_income = await new Income(income);
    await new_income.save();
    const monthId = new_income.month;
    const addIncomeToMonth = await Month.findOne({ _id: monthId });
    console.log("monthId", addIncomeToMonth);
    addIncomeToMonth.incomes.push(new_income)
    await Month.findByIdAndUpdate(monthId, addIncomeToMonth, {
      new: true,
    });
    res.status(201).json({ message: "Added successfully", new_income });
  } catch {
    res.status(401).json({ message: "Cannot create an object" });
  }
};

const getAllIncome = async (req, res, next) => {
  try {
    await Income.find({ month: req.params.id }).then((e) => {
      res.status(200).json(e);
    });
  } catch {
    res.status(401).json({ message: "Cannot create an object" });
  }
};

const updateIncome = async (req, res) => {
  try {
    await Income.updateOne({ _id: req.params.id }, req.body).then((e) => {
      res.status(200).json(e);
    });
  } catch {
    res.status(401).json({ message: "Cannot update the object" });
  }
};

const getIncome = async (req, res) => {
  try {
    await Income.findById({ _id: req.params.id }).then((e) => {
      res.status(200).json(e);
    });
  } catch {
    res.status(401).json({ message: "Cannot find the object" });
  }
};

const deleteIncome = async (req, res, next) => {
  const { id: incomeID } = req.params;
  const income = await Income.findOne({ _id: incomeID });
  await Month.updateMany({ incomes: incomeID }, { $pull: { incomes: incomeID } });
  await Income.findOneAndDelete({ _id: incomeID });
  if (!income) {
    res.status(401).json({ message: "Cannot delete the object" });
  }
  res.status(200).json({ income });
};

module.exports = {
  createIncome,
  getAllIncome,
  updateIncome,
  getIncome,
  deleteIncome
};
