const {check} = require('express-validator');

const validator = require("../../middlewere/validator")

exports.addToFavorite = [

    check("product_id").notEmpty().withMessage("product_id is required"),
    validator,
]
