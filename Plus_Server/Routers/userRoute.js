const express = require("express");
const router = express.Router();

const {
     createUser,
     updateUser, 
     getUser,
     login
    } = require("../Controllers/userController");

router.route("/").post(createUser);
router.route("/:id").patch(updateUser).get(getUser);
router.route("/:mail/:password").get(login)

module.exports = router;
