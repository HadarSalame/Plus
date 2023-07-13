const express = require("express");
const router = express.Router();

const {
    creatMonth,
    getMonth,
    getAllMonth,
    updateMonth,
    deleteMonth
    } = require("../Controllers/monthController");

router.route("/").post(creatMonth);
router.route("/:id").get(getMonth).patch(updateMonth).delete(deleteMonth);
// router.route("/:user_id").get(getAllMonth);4
router.get('/getMonth/:user',getAllMonth);




module.exports = router;