const express = require("express");
const router = express.Router();

const {
    createIncome,
    getAllIncome,
    updateIncome,
    getIncome,
    deleteIncome
    } = require("../Controllers/incomeController");

router.route("/").post(createIncome);
router.route("/:id").patch(updateIncome).get(getIncome).delete(deleteIncome);
router.route("/getAll/:month").get(getAllIncome);


module.exports = router;