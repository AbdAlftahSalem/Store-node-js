const {check} = require('express-validator');

const validator = require("../../middlewere/validator")

// create coupon validator
exports.createCoupon = [
    check("code").notEmpty().withMessage("code required"),
    check("discount").notEmpty().withMessage("discount required"),
    check("expireAt").notEmpty().withMessage("expired_at required"),
    validator,
]

// check coupon validator
exports.checkCoupon = [
    check("code").notEmpty().withMessage("code required"),
    validator,
]
