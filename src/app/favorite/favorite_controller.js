const {Favorite, Product, Category} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");


// add product to favorite
exports.addProductToFavorite = async (req, res, next) => {

    // add user_id to body
    req.body["user_id"] = req.body.user["id"]

    // check if product exist
    const product = await Favorite.findOne({
        where: {product_id: req.body["product_id"], user_id: req.body["user_id"]},
    })

    // if product exist , remove it from favorite
    if (product) {
        await product.destroy()
        return successResponse(res, null, 200, "product removed from favorite successfully")
    }

    // add product to favorite
    await Favorite.create(req.body)
    return successResponse(res, null, 200, "product added to favorite successfully")

}

// get all favorite products
exports.getAllFavoriteProducts = async (req, res, next) => {
    const products = await Favorite.findAll({
        where: {user_id: req.body.user["id"]},
        include: [
            {
                model: Product, foreignKey: 'product_id',
                include: [{
                    model: Category,
                    foreignKey: 'category_id',
                }],
                attributes: {exclude: ['user_id', 'category_id', "sub_category_id"]},
            }
        ],
        attributes: {exclude: ['user_id', 'product_id']},
    })
    return successResponse(res, products, 200, "Favorites found successfully")
}

