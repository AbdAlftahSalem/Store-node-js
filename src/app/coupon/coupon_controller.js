const {Coupon} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");

// create coupon
exports.createCoupon = async (req, res, next) => {
    try {
        // check if coupon code already exists
        const coupon = await Coupon.findOne(
            {where: {code: req.body["code"]}}
        )
        if (coupon) {
            return next(new ApiError("Coupon code already exists", 400))
        }

        // create coupon
        const newCoupon = await Coupon.create(req.body)
        return successResponse(res, newCoupon, 201, "Coupon created successfully")
    } catch (err) {
        return next(new ApiError(err.message, 500))
    }
}

// get all coupons
exports.getAllCoupons = async (req, res, next) => {
    try {
        const coupons = await Coupon.findAll();
        return successResponse(res, coupons, 200, "Coupons found successfully");
    } catch (error) {
        // Handle the error appropriately
        return next(new ApiError(error.message, 500))

    }
}

// check coupon is not expired
exports.checkCoupon = async (req, res, next) => {
    const coupon = await Coupon.findOne({
        where: {code: req.body["code"]},
    })
    if (!coupon) {
        return next(new ApiError("Coupon not found", 404))
    }
    if (coupon["expired_at"] < new Date()) {
        return next(new ApiError("Coupon is expired", 400))
    }
    return successResponse(res, null, 200, "Coupon is valid")
}
