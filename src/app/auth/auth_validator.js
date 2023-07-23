const {check} = require('express-validator');

const validator = require("../../middlewere/validator")
const User = require("./user_model")

exports.registerUser = [

    check("user_name")
        .isLength({min: 3})
        .withMessage("Too Short username")
        .isLength({max: 20}).withMessage("Too long username"),

    check("email").notEmpty().isEmail().withMessage("Enter valid email")
        .isLength({min: 3})
        .withMessage("Too Short email")
        .isLength({max: 18})
        .withMessage("Too long email").custom((value) => {
        return User.findOne({email: value}).then((res) => {
            if (res) {
                return Promise.reject("The email is already exists");
            }
        })
    }).withMessage("The email is already exists"),

    check("password")
        .notEmpty()
        .isLength({min: 6})
        .withMessage("password at lease have 6 char")
        .custom((password, {req}) => {
            if (password !== req.body["passwordConfirm"]) {
                throw  new Error("password confirm not correct")
            }
            return true;
        }),

    check("passwordConfirm")
        .notEmpty().withMessage("password confirm required")
        .isLength({min: 6})
        .withMessage("password at lease have 6 char"),

    check("phone").notEmpty().withMessage("phone required"),


    validator,


]
