const express = require("express")
const validator = require("../auth/auth_validator")


const {
    loginUser, registerUser, getMe, protectRout
} = require("./auth_controller")

const {uploadFile} = require("../../middlewere/upload_file");


const router = express.Router();


router.route("/register").post(validator.registerUser, registerUser)
module.exports = router;
