const express = require("express")

const {
    checkCoupon, createCoupon, getAllCoupons
} = require("./coupon_controller")

const Auth = require("../auth/auth_controller")
const {ApiError} = require("../../utils/response_handel/error_handeler");

const router = express.Router();

router.route("/get-coupons").get((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), getAllCoupons)
router.route("/create-coupon").post((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), createCoupon)
router.route("/check-coupon").post(Auth.protectRout, checkCoupon)

module.exports = router;