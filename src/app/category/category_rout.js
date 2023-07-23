const express = require("express")
const validator = require("../category/category_validator")


const {
    createCategory, deleteCategory, getAllCategories, getAllSubCategoriesForCategory, updateCategory
} = require("./category_controller")


const router = express.Router();


router.route("/get-categories").get(getAllCategories)
router.route("/get-sub-categories").get(validator.getAllSubCategoriesForCategory, getAllSubCategoriesForCategory)
router.route("/create-category").post(validator.createCategory, createCategory)
router.route("/update-category").put(validator.updateCategory, updateCategory)
router.route("/delete-category").delete(validator.deleteCategory, deleteCategory)

module.exports = router;
