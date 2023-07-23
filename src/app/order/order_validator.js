const {check} = require('express-validator');

const validator = require("../../middlewere/validator")
const {ApiError} = require("../../utils/response_handel/error_handeler");

exports.createOrder = [

    (req, res, next) => {

        // Check if the products array is empty
        if (req.body["products"] == null) {
            if (req.body["products"].length === 0) {
                return next(new ApiError("products array is empty 1", 400));
            }
            return next(new ApiError("products array is empty 2", 400));
        }
        next();
    },
    validator,
]

exports.editOrderForUser = [check("order_id").notEmpty().withMessage("order_id required"), validator,]

exports.changeOrderStatus = [check("order_id").notEmpty().withMessage("order_id required"), check("status_order").notEmpty().withMessage("status_order required"), check("status_order").isIn(['pending', 'delivery', 'delivered']).withMessage("status_order must be pending or in delivery or delivered"), validator,]

exports.deleteOrder = [check("order_id").notEmpty().withMessage("order_id required"), validator,]