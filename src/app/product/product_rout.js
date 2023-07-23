const express = require("express")
const validator = require("../product/product_validator")
const {User, Category} = require("../models_index")

const {
    createProduct,
    deleteProduct,
    getAllProducts,
    getAllProductsForCategory,
    getAllProductsForUser,
    getProductById,
} = require("./product_controller")
const Auth = require("../auth/auth_controller");

const {uploadFile} = require("../../middlewere/upload_file");
const {ApiError} = require("../../utils/response_handel/error_handeler");


const router = express.Router();

createProductValidator = (req, res, next) => {
    if (req.body["title"] == null || req.body["title"].length < 2 || req.body["title"].length > 18) {
        return next(new ApiError("Enter valid title", 400))
    }

    if (req.body["description"] == null || req.body["description"].length < 10) {
        return next(new ApiError("Enter valid description", 400))
    }

    if (req.body["price"] == null || req.body["price"] < 0) {
        return next(new ApiError("Enter valid price", 400))
    }

    if (req.body["category_id"] == null) {
        return next(new ApiError("Enter valid category_id", 400))
    }

    if (req.body["quantity"] == null || req.body["quantity"] < 0) {
        return next(new ApiError("Enter valid quantity", 400))
    }

    // check if category_id is valid and sane in database
    const category = Category.findOne({where: {id: req.body["category_id"]}})
    if (!category) {
        return next(new ApiError("Enter valid category_id", 400))
    }

    // check if user_id is valid and sane in database
    const user = User.findOne({where: {id: req.body["user_id"]}})
    if (!user) {
        return next(new ApiError("Enter valid user_id", 400))
    }
    next()
}

router.route("/get-products").get(getAllProducts)
router.route("/get-product-by-id").get(validator.getProductById, getProductById)
router.route("/get-products-for-category").get(validator.getAllProductsForCategory, getAllProductsForCategory)
router.route("/get-products-for-user").get(validator.getAllProductsForUser, getAllProductsForUser)
router.route("/create-product").post((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), (req, res, next) => uploadFile(req, res, next, "image"), createProductValidator, createProduct)
router.route("/delete-product").post(Auth.protectRout, validator.deleteProduct, deleteProduct)


module.exports = router;
