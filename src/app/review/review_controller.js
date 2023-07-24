const {Review, Product} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");


// add review to product
exports.addReview = async (req, res, next) => {
    // add user_id to body
    req.body["user_id"] = req.body.user["id"]

    // check if product exist and available

    const product = await Product.findOne({
        where: {id: req.body["product_id"], status: "available"},
    })

    if (!product) {
        return next(new ApiError("Product not found", 404))
    }

    // check if rating is between 1 and 5
    if (req.body["rating"] < 1 || req.body["rating"] > 5) {
        return next(new ApiError("rating must be between 1 and 5", 400))
    }

    // check if review is empty
    if (req.body["review"] === "") {
        return next(new ApiError("review can`t be empty", 400))
    }

    // check if user already add review to this product
    const review = await Review.findOne({
        where: {user_id: req.body.user["id"], product_id: req.body["product_id"]},
    })

    if (review) {
        return next(new ApiError("you already add review to this product", 400))
    }

    // add review to product
    await Review.create(req.body)

    successResponse(res, 200, "review added successfully")

}

// edit review
exports.editReview = async (req, res, next) => {
    // add user_id to body
    req.body["user_id"] = req.body.user["id"]

    // check if product exist
    const product = await Product.findOne({
        where: {id: req.body["product_id"]},
    })

    if (!product) {
        return next(new ApiError("Product not found", 404))
    }

    // check if review exist
    const review = await Review.findOne({
        where: {id: req.body["review_id"]},
    })

    if (!review) {
        return next(new ApiError("Review not found", 404))
    }

    // check if user is owner of review
    if (req.body.user["id"] !== review["user_id"]) {
        return next(new ApiError("You are not authorized to edit this review", 401))
    }

    // check if rating is between 1 and 5
    if (req.body["rating"] < 1 || req.body["rating"] > 5) {
        return next(new ApiError("rating must be between 1 and 5", 400))
    }

    // check if review is empty
    if (req.body["review"] === "") {
        return next(new ApiError("review can`t be empty", 400))
    }

    // edit review
    await Review.update(req.body, {where: {id: req.body["review_id"]}})

    successResponse(res, 200, "review edited successfully")

}

// delete review
exports.deleteReview = async (req, res, next) => {
    // add user_id to body
    req.body["user_id"] = req.body.user["id"]

    // check if product exist
    const product = await Product.findOne({
        where: {id: req.body["product_id"]},
    })

    if (!product) {
        return next(new ApiError("Product not found", 404))
    }

    // check if review exist
    const review = await Review.findOne({
        where: {id: req.body["review_id"]},
    })

    if (!review) {
        return next(new ApiError("Review not found", 404))
    }

    // check if user is owner of review
    if (req.body.user["id"] !== review["user_id"]) {
        return next(new ApiError("You are not authorized to delete this review", 401))
    }

    // delete review
    await Review.destroy({where: {id: req.body["review_id"]}})

    successResponse(res, 200, "review deleted successfully")

}

// get all reviews for product
exports.getAllReviewsForProduct = async (req, res, next) => {
    // check if product exist
    const product = await Product.findOne({
        where: {id: req.body["product_id"]},
    })

    if (!product) {
        return next(new ApiError("Product not found", 404))
    }

    // get all reviews for product
    const reviews = await Review.findAll({
        where: {product_id: req.body["product_id"]},
    })

    successResponse(res, reviews, 200, "reviews for product")

}

