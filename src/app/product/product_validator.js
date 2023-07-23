const {check} = require('express-validator');

const validator = require("../../middlewere/validator")

exports.createProduct = [

    check("name").notEmpty().isEmail().withMessage("Enter valid name"),
    check("description").notEmpty().withMessage("description required").isLength({min: 10}).withMessage("description" +
        " at lease have 10 char"),
    check("price").notEmpty().withMessage("price required"),
    check("category_id").notEmpty().withMessage("category_id required"),
    check("sub_category_id").notEmpty().withMessage("sub_category_id required"),
    check("image").notEmpty().withMessage("image required"),
    check("quantity").notEmpty().withMessage("quantity required"),

    validator,
]

exports.updateProduct = [
    check("product_id").notEmpty().withMessage("product_id required"),
    validator,
]

exports.deleteProduct = [
    check("product_id").notEmpty().withMessage("product_id required"),
    validator,
]

exports.getAllProductsForCategory = [
    check("category_id").notEmpty().withMessage("category_id required"),
    validator,
]

exports.getAllProductsForSubCategory = [
    check("sub_category_id").notEmpty().withMessage("sub_category_id required"),
    validator,
]

exports.getAllProductsForUser = [
    check("user_id").notEmpty().withMessage("user_id required"),
    validator,
]

exports.getProductById = [
    check("product_id").notEmpty().withMessage("product_id required"),
    validator,
]