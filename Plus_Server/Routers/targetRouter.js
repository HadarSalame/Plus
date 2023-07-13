const express = require("express");
const router = express.Router();

const {
    createTarget,
    getAllTarget,
    updateTarget,
    getTarget,
    deleteTarget
    } = require("../Controllers/targetController");

router.route("/").post(createTarget);
router.route("/:id").patch(updateTarget).get(getTarget).delete(deleteTarget);
router.route("/getAll/:user").get(getAllTarget);


module.exports = router;