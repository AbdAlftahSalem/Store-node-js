const {check} = require('express-validator');

const validator = require("../../middlewere/validator")

exports.addReview = [
    check("product_id").notEmpty().withMessage("product_id required"),
    check("rating").notEmpty().withMessage("rating required"),
    check("review").notEmpty().withMessage("review required"),
    validator,
]

exports.editReview = [
    check("product_id").notEmpty().withMessage("product_id required"),
    check("rating").notEmpty().withMessage("rating required"),
    check("review").notEmpty().withMessage("review required"),
    validator,
]

exports.deleteReview = [
    check("review_id").notEmpty().withMessage("review_id required"),
    validator,
]