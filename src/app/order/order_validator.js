const {check} = require('express-validator');

const validator = require("../../middlewere/validator")

exports.createOrder = [


    check('product').isArray().not().isEmpty().withMessage("product must be array"),
    check("address_id").isInt().withMessage("address_id must be integer"),

    validator,

]
