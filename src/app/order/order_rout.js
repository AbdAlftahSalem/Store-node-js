const express = require("express")
const validator = require("../order/order_validator")


const {
    createOrder
} = require("./order_controller")

const Auth = require("../auth/auth_controller")

const router = express.Router();

router.route("/create-order").post(Auth.protectRout, validator.createOrder, createOrder)

module.exports = router;
