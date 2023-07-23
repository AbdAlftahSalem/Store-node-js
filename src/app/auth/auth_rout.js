const express = require("express")
const validator = require("../auth/auth_validator")


const {
    loginUser, registerUser
} = require("./auth_controller")


const router = express.Router();


router.route("/register").post(validator.registerUser, registerUser)
router.route("/login").post(validator.loginUser, loginUser)
module.exports = router;
