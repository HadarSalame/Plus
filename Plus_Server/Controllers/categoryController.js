// const Month = require("../Models/monthModel");
// const Exports = require("../Models/expensesModel");
// const Income = require("../Models/incomeModel");
const Category = require("../Models/categoryModel");

// const categoryModel = require("../Models/categoryModel");



const createCategory = async (req, res) => {
    const category = req.body;
    try {
      let new_category = await new Category(category);
      await new_category.save();
      const monthId = new_category.month;
    //   const category_sum = new_category.total;
      const addCategoryToMonth = await Month.findOne({ _id: monthId });
      addCategoryToMonth.expenses.push(new_expense);
      await Month.findByIdAndUpdate(monthId, addExpenseToMonth, {
        new: true,
      });
      res.status(201).json({ message: "Added successfully", new_expense });
    } catch {
      res.status(401).json({ message: "Cannot create an object" });
    }
  };
  

const getCategoryByMonth = async (req, res) => {
    try {
        console.log('getCategoryByMonth id',req.params.month);
        await Category.find({ month: req.params.month }).then((e) => {
          res.status(200).json(e);
        });
      } catch {
        res.status(401).json({ message: "Cannot find the object" });
      }
};

// //not working
// const getAllMonth = async (req, res) => {
//   try {
//     await Month.find({ user: req.params.id }).then((e) => {
//       res.status(200).json(e);
//     });
//   } catch {
//     res.status(401).json({ message: "Cannot create an object" });
//   }
// };

// const updateMonth = async (req, res) => {
//   try {
//     await Month.updateOne({ _id: req.params.id }, req.body).then((e) => {
//       console.log("ok");
//       res.status(200).json(e);
//     });
//   } catch {
//     res.status(401).json({ message: "Cannot update the object" });
//   }
// };

// const deleteMonth = async (req, res, next) => {
//   const { id: monthId } = req.params;
//   const month = await Month.findOne({ _id: monthId });
//   await User.updateMany({ monthly: monthId }, { $pull: { monthly: monthId } });
//   await Month.findOneAndDelete({ _id: monthId });
//   if (!month) {
//     res.status(401).json({ message: "Cannot delete the object" });
//   }
//   res.status(200).json({ month });
// };

module.exports = {
 createCategory,
 getCategoryByMonth
};
