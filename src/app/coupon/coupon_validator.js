const {check} = require('express-validator');

const validator = require("../../middlewere/validator")
const {Coupon} = require("../models_index")

// create coupon validator
exports.createCoupon = [
    check("code").notEmpty().withMessage("code required"),
    check("discount").notEmpty().withMessage("discount required"),
    check("expired_at").notEmpty().withMessage("expired_at required"),
    check("user_id").notEmpty().withMessage("user_id required"),
    validator,
]

// check coupon validator
exports.checkCoupon = [
    check("code").notEmpty().withMessage("code required"),
    validator,
]
