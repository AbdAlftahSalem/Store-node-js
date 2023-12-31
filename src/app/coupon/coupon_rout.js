const express = require("express")
const validator = require("../coupon/coupon_validator")

const {
    checkCoupon, createCoupon, getAllCoupons
} = require("./coupon_controller")

const Auth = require("../auth/auth_controller")

const router = express.Router();

router.route("/get-coupons").get((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), getAllCoupons)
router.route("/create-coupon").post((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), validator.createCoupon, createCoupon)
router.route("/check-coupon").post(Auth.protectRout, validator.checkCoupon, checkCoupon)

module.exports = router;