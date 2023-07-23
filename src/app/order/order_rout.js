const express = require("express")
const validator = require("../order/order_validator")
const {Order} = require("../models_index")

const {
    changeOrderStatus, createOrder, deleteOrderForUser, editOrderForUser, getAllOrdersForAdmin, getAllOrdersForUser
} = require("./order_controller")

const Auth = require("../auth/auth_controller");


const router = express.Router();

router.route("/get-all-order-user").get(Auth.protectRout, getAllOrdersForUser)
router.route("/get-all-order-admin").get((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), getAllOrdersForAdmin)
router.route("/create-order").post(Auth.protectRout, validator.createOrder, createOrder)
router.route("/edit-order").put(Auth.protectRout, validator.editOrderForUser, editOrderForUser)
router.route("/delete-order").delete(Auth.protectRout, validator.deleteOrder, deleteOrderForUser)
router.route("/change-order-status").put((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), validator.changeOrderStatus, changeOrderStatus)


module.exports = router;
