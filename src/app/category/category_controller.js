const {Category} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");

const env = require("dotenv");
env.config({path: "./config.env"})

// create category
exports.createCategory = async (req, res, next) => {
    const category = await Category.create(req.body)
    return successResponse(res, category, 201, "Category created successfully")
}

// get all categories
exports.getAllCategories = async (req, res, next) => {
    const categories = await Category.findAll()
    return successResponse(res, categories, 200, "Categories found successfully")
}

// get all sub categories for category
exports.getAllSubCategoriesForCategory = async (req, res, next) => {
    const category = await Category.findOne({
        where: {parent_category: req.body["category_id"]},
    })
    if (!category) {
        return next(new ApiError("Category not found", 404))
    }
    return successResponse(res, category, 200, "Sub categories found successfully")
}

// update category
exports.updateCategory = async (req, res, next) => {
    const category = await Category.update(req.body, {
        where: {id: req.body["category_id"]},
    })
    if (!category) {
        return next(new ApiError("Category not found", 404))
    }
    return successResponse(res, category, 200, "Category updated successfully")
}

// delete category
exports.deleteCategory = async (req, res, next) => {
    // delete category
    const category = await Category.destroy({
        where: {id: req.body["category_id"]},
    })
    if (!category) {
        return next(new ApiError("Category not found", 404))
    }

    // delete all sub categories for category
    const subCategories = await Category.destroy({
        where: {parent_category: req.body["category_id"]},
    })
    if (!subCategories) {
        return next(new ApiError("Sub categories not found", 404))
    }

    return successResponse(res, category, 200, "Category deleted successfully")
}
