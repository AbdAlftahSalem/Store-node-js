const express = require("express")
const validator = require("../order/order_validator")


const {
    createOrder, getAllOrdersForUser
} = require("./order_controller")

const Auth = require("../auth/auth_controller")

const router = express.Router();

router.route("/create-order").post(Auth.protectRout, validator.createOrder, createOrder)
router.route("/get-all-orders").get(Auth.protectRout, getAllOrdersForUser)

module.exports = router;
