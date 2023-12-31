const {Product, Category, User, Review} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");
const {Op} = require("sequelize");


// create product
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body)
    return successResponse(res, product, 201, "Product created successfully")
}

// get all products
exports.getAllProducts = async (req, res, next) => {

    const {minPrice, maxPrice, orderBy} = req.query;

    // Build the filter object based on the query parameters
    const filters = {};
    if (minPrice !== undefined && !isNaN(minPrice)) {
        filters.price = {[Op.gte]: parseFloat(minPrice)};
    }
    if (maxPrice !== undefined && !isNaN(maxPrice)) {
        filters.price = {...filters.price, [Op.lte]: parseFloat(maxPrice)};
    }

    const products = await Product.findAll({
        include: [
            {
                model: Category, foreignKey: 'category_id',
            }, {
                model: User, foreignKey: 'user_id', attributes: {exclude: ['password']},
            }, {
                model: Review, // Include the Review model to get reviews
            }
        ],
        where: filters,
    })

    // Calculate the average rating for each product and remove the review list
    products.forEach((product) => {
        const reviews = product["Reviews"];
        product.dataValues.rating =
            reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
        delete product.dataValues["Reviews"];
    });

    // Apply sorting based on the orderBy parameter
    if (orderBy === "topRating") {
        products.sort((a, b) => b.dataValues.rating - a.dataValues.rating);
    } else if (orderBy === "lowRating") {
        products.sort((a, b) => a.dataValues.rating - b.dataValues.rating);
    }


    return successResponse(res, products, 200, "Products found successfully")
}

// get product by id
exports.getProductById = async (req, res, next) => {
    const product = await Product.findOne({
        where: {id: req.body["product_id"]}, include: [{
            model: Category, foreignKey: 'category_id',
        }, {
            model: User, foreignKey: 'user_id', attributes: {exclude: ['password']},
        }],
    })
    if (!product) {
        return next(new ApiError("Product not found", 404))
    }

    // get reviews for product
    const reviews = await Review.findAll({
        where: {product_id: req.body["product_id"]}, include: [{
            model: User, foreignKey: 'user_id', attributes: {exclude: ['password']},
        }],

    })


    return successResponse(res, {product, reviews}, 200, "Product found successfully")
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
        where: {user_id: req.body["user_id"]}, include: [{
            model: Category, foreignKey: 'category_id',
        }, {
            model: User, foreignKey: 'user_id', attributes: {exclude: ['password']},
        }],
    })
    if (!products) {
        return next(new ApiError("Products not found", 404))
    }
    return successResponse(res, products, 200, "Products found successfully")
}
