const {Category} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");


// create category
exports.createCategory = async (req, res, next) => {
    try {
        console.log(req.body)
        console.log(req.body["name"])
        console.log("**************************\n\n")
        // check if category name already exists
        const category = await Category.findOne(
            {where: {name: req.body["name"]}}
        )
        console.log(category)
        if (category) {
            return next(new ApiError("Category name already exists", 400))
        }

        // create category
        const newCategory = await Category.create(req.body)
        return successResponse(res, newCategory, 201, "Category created successfully")
    } catch (err) {
        return next(new ApiError(err.message, 500))
    }
}

// get all categories along with parent category
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            include: [{model: Category, as: 'parentCategory'}],
        });

        return successResponse(res, categories, 200, "Categories found successfully");
    } catch (error) {
        // Handle the error appropriately
        return next(new ApiError(error.message, 500))

    }
};

// get all sub categories for category
exports.getAllSubCategoriesForCategory = async (req, res, next) => {
    const category = await Category.findAll({
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
    // check if category exists
    const category = await Category.findOne({
        where: {id: req.body["category_id"]},
    })
    if (!category) {
        return next(new ApiError("Category not found", 404))

    }

    // delete category
    await Category.destroy({
        where: {id: req.body["category_id"]},
    })

    // delete all sub categories
    await Category.destroy({
        where: {parent_category: req.body["category_id"]},
    })

    return successResponse(res, null, 200, "Category deleted successfully")
}
