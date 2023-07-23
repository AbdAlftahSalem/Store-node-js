const express = require("express")
const validator = require("../category/category_validator")
const {uploadFile} = require("../../middlewere/upload_file");

const {
    createCategory, deleteCategory, getAllCategories, getAllSubCategoriesForCategory, updateCategory
} = require("./category_controller")

const Auth = require("../auth/auth_controller")
const {ApiError} = require("../../utils/response_handel/error_handeler");
const router = express.Router();

validateName = (req, res, next) => {
    if (req.body["name"] == null || req.body["name"].length < 2 || req.body["name"].length > 18) {
        return next(new ApiError("Enter valid name", 400))
    }
    next()
}

validateSubCategory = (req, res, next) => {
    // validate parent_category
    if (req.body["parent_category"] == null) {
        return next(new ApiError("Enter valid parent_category", 400))
    }

    // validate name sub category
    if (req.body["name"] == null || req.body["name"].length < 2 || req.body["name"].length > 18) {
        return next(new ApiError("Enter valid name", 400))
    }

    next()
}

router.route("/get-categories").get(Auth.protectRout, getAllCategories)
router.route("/get-sub-categories").get(Auth.protectRout, validator.getAllSubCategoriesForCategory, getAllSubCategoriesForCategory)
router.route("/create-category").post((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), (req, res, next) => uploadFile(req, res, next, "image"), validateName, createCategory)
router.route("/create-sub-category").post((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), (req, res, next) => uploadFile(req, res, next, "image"), validateSubCategory, createCategory)
router.route("/update-category").put((req, res, next) => Auth.protectRout(req, res, next, ["manger", "admin"]), validator.updateCategory, updateCategory)
router.route("/delete-category").delete((req, res, next) => Auth.protectRout(req, res, next, ["manger"]), validator.deleteCategory, deleteCategory)

module.exports = router;
