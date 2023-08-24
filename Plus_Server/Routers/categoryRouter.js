const express = require("express");
const router = express.Router();

const {
    createCategory,
    getCategoryByMonth
    } = require("../Controllers/categoryController");

router.route("/").post(createCategory);
// router.route("/:id").patch(updateExpense).get(getExpense).delete(deleteExpense);
router.route("/getCategory/:month").get(getCategoryByMonth);


module.exports = router;