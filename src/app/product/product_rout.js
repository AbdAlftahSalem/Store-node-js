const express = require("express")
const validator = require("../product/product_validator")


const {
    createProduct,
    deleteProduct,
    getAllProducts,
    getAllProductsForCategory,
    getAllProductsForSubCategory,
    getAllProductsForUser,
    updateProduct,
    getProductById,
} = require("./product_controller")


const router = express.Router();


router.route("/get-products").get(getAllProducts)
router.route("/get-product-by-id").get(validator.getProductById, getProductById)
router.route("/get-products-for-category").get(validator.getAllProductsForCategory, getAllProductsForCategory)
router.route("/get-products-for-sub-category").get(validator.getAllProductsForSubCategory, getAllProductsForSubCategory)
router.route("/get-products-for-user").get(validator.getAllProductsForUser, getAllProductsForUser)
router.route("/create-product").post(validator.createProduct, createProduct)
router.route("/update-product").post(validator.updateProduct, updateProduct)
router.route("/delete-product").post(validator.deleteProduct, deleteProduct)


module.exports = router;
