const express = require("express");
const router = express.Router();

const {
    createExpense,
    getAllExpense,
    updateExpense,
    getExpense,
    deleteExpense
    } = require("../Controllers/expensesController");

router.route("/").post(createExpense);
router.route("/:id").patch(updateExpense).get(getExpense).delete(deleteExpense);
router.route("/getAll/:month").get(getAllExpense);


module.exports = router;