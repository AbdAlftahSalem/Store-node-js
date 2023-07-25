const express = require("express")
const validator = require("./cart_validator")
const {Order} = require("../models_index")

const {
    changeOrderStatus, createOrder, deleteOrderForUser, editOrderForUser, getAllOrdersForAdmin, getAllOrdersForUser
} = require("./cart_controller")

const Auth = require("../auth/auth_controller");


const router = express.Router();

router.route("/get-all-cart-user").get(Auth.protectRout, getAllOrdersForUser)
// router.route("/get-all-cart-admin").get((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), getAllOrdersForAdmin)
router.route("/add-to-cart").post(Auth.protectRout, validator.createOrder, createOrder)
router.route("/edit-cart").put(Auth.protectRout, editOrderForUser)
router.route("/delete-cart").delete(Auth.protectRout, deleteOrderForUser)
router.route("/change-cart-status").put((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), validator.changeOrderStatus, changeOrderStatus)


module.exports = router;
