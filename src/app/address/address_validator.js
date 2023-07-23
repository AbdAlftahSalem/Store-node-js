const {check} = require('express-validator');

const validator = require("../../middlewere/validator")

exports.createAddress = [

    check("address").notEmpty().withMessage("address required"),
    check("city").notEmpty().withMessage("city required"),
    check("state").notEmpty().withMessage("state required"),
    check("country").notEmpty().withMessage("country required"),
    check("zip_code").notEmpty().withMessage("zip_code required"),
    check("latitude").notEmpty().withMessage("latitude required"),
    check("longitude").notEmpty().withMessage("longitude required"),
    validator,
]

exports.updateAddress = [
    check("address_id").notEmpty().withMessage("address_id required"),
    validator,
]

exports.deleteAddress = [
    check("address_id").notEmpty().withMessage("address_id required"),
    validator,
]

exports.getAllAddressesForUser = [
    check("user_id").notEmpty().withMessage("user_id required"),
    validator,
]
