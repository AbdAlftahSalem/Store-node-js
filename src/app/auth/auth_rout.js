const express = require("express")
const validator = require("../auth/auth_validator")


const {
    loginUser, registerUser, getMe, protectRout
} = require("./auth_controller")


const router = express.Router();


router.route("/register").post(validator.registerUser, registerUser)
router.route("/login").post(validator.loginUser, loginUser)
router.route("/me").get(protectRout, getMe)
module.exports = router;
