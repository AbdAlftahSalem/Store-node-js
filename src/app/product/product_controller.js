const {Product} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");

const env = require("dotenv");
env.config({path: "./config.env"})

// create product
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body)
    return successResponse(res, product, 201, "Product created successfully")
}

// get all products
exports.getAllProducts = async (req, res, next) => {
    const products = await Product.findAll()
    return successResponse(res, products, 200, "Products found successfully")
}

// get product by id
exports.getProductById = async (req, res, next) => {
    const product = await Product.findOne({
        where: {id: req.body["product_id"]},
    })
    if (!product) {
        return next(new ApiError("Product not found", 404))
    }
    return successResponse(res, product, 200, "Product found successfully")
}

// update product
exports.updateProduct = async (req, res, next) => {
    const product = await Product.update(req.body, {
        where: {id: req.body["product_id"]},
    })
    if (!product) {
        return next(new ApiError("Product not found", 404))
    }
    return successResponse(res, product, 200, "Product updated successfully")
}

// delete product
exports.deleteProduct = async (req, res, next) => {

    //  1 - check if product exist
    const product = await Product.findOne({
        where: {id: req.body["product_id"]},
    })

    if (!product) {
        return next(new ApiError("Product not found", 404))
    }

    //  2 - check if user is manger or admin or owner of product
    if (req.body.user["role"] !== "admin" && req.body.user["role"] !== "manager" && req.body.user["id"] !== product["user_id"]) {
        return next(new ApiError("You are not authorized to delete this product", 401))
    }
    //  3 - delete product
    const deletedProduct = await Product.destroy({
        where: {id: req.body["product_id"]},
    })
    if (!deletedProduct) {
        return next(new ApiError("Product not found", 404))
    }
    return successResponse(res, deletedProduct, 200, "Product deleted successfully")
}

// get all products for category
exports.getAllProductsForCategory = async (req, res, next) => {
    const products = await Product.findAll({
        where: {category_id: req.body["category_id"]},
    })
    if (!products) {
        return next(new ApiError("Products not found", 404))
    }
    return successResponse(res, products, 200, "Products found successfully")
}

// get all products for sub category
exports.getAllProductsForSubCategory = async (req, res, next) => {
    const products = await Product.findAll({
        where: {sub_category_id: req.body["sub_category_id"]},
    })
    if (!products) {
        return next(new ApiError("Products not found", 404))
    }
    return successResponse(res, products, 200, "Products found successfully")
}

// get all products for user
exports.getAllProductsForUser = async (req, res, next) => {
    const products = await Product.findAll({
        where: {user_id: req.body["user_id"]},
    })
    if (!products) {
        return next(new ApiError("Products not found", 404))
    }
    return successResponse(res, products, 200, "Products found successfully")
}