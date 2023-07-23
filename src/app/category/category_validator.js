const {check} = require('express-validator');

const validator = require("../../middlewere/validator")
const {Category} = require("../models_index")

exports.createCategory = [


    check("name").notEmpty().isEmail().withMessage("Enter valid name")
        .isLength({min: 3})
        .withMessage("Too Short name")
        .isLength({max: 18})
        .withMessage("Too long name").custom((value) => {
        return Category.findOne({name: value}).then((res) => {
            if (res) {
                return Promise.reject("The name is already exists");
            }
        })
    }).withMessage("The name is already exists"),

    check("image").notEmpty().withMessage("image required"),


    validator,
]

exports.updateCategory = [
    check("category_id").notEmpty().withMessage("category_id required"),
    validator,
]

exports.deleteCategory = [
    check("category_id").notEmpty().withMessage("category_id required"),
    validator,
]

exports.getAllSubCategoriesForCategory = [
    check("category_id").notEmpty().withMessage("category_id required"),
    validator,
]
