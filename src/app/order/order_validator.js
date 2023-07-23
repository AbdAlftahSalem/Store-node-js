const {check} = require('express-validator');

const validator = require("../../middlewere/validator")
const {Order} = require("../models_index")

exports.createOrder = [

    check("address_id").notEmpty().withMessage("address_id required"),
    check("product_id").notEmpty().withMessage("product_id required"),
    check("quantity").notEmpty().withMessage("quantity required"),
    validator,
]

exports.editOrderForUser = [
    check("order_id").notEmpty().withMessage("order_id required"),
    validator,
]

exports.changeOrderStatus = [
    check("order_id").notEmpty().withMessage("order_id required"),
    check("status_order").notEmpty().withMessage("status_order required"),
    check("status_order").isIn(['pending', 'delivery', 'delivered']).withMessage("status_order must be pending or in delivery or delivered"),
    validator,
]