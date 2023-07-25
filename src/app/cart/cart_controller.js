const {Cart, Address, Product} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");

const env = require("dotenv");
env.config({path: "./config.env"})

// create cart
exports.addToCart = async (req, res, next) => {

    // add user_id to body
    req.body["user_id"] = req.body.user["id"]

    // check if address exist
    // const address = await Address.findOne({
    //     where: {id: req.body["address_id"]},
    // })
    //
    // if (!address) {
    //     return next(new ApiError("Address not found", 404))
    // }

    // check if user is owner of address
    // if (req.body.user["id"] !== address["user_id"]) {
    //     return next(new ApiError("You are not authorized to create cart with this address", 401))
    // }

    // check if product exist
    // const product = await Product.findOne({
    //     where: {id: req.body["product_id"]},
    // })
    //
    // if (!product) {
    //     return next(new ApiError("Product not found", 404))
    // }
    //
    // // check if product quantity is available
    // if (product["quantity"] < req.body["quantity"]) {
    //     return next(new ApiError("can`t create cart , the maximum quantity is " + product['quantity'], 400))
    // }

    // check if product status is available
    // if (product["status"] !== "available") {
    //     return next(new ApiError("can`t create cart , the product is not available", 400))
    // }

    // check if address is found in database and is owned by user
    // const addressFound = await Address.findOne({
    //     where: {id: req.body["address_id"]},
    // })
    //
    // if (!addressFound) {
    //     return next(new ApiError("Address not found", 404))
    // }


    const statusCheck = await validateInputCart(req.body["products"], req.body.user["id"], req.body["address_id"], next)
    if (!statusCheck) {
        return next(new ApiError("can`t create cart", 400))
    }
    // create cart for array of products
    if (req.body["products"]) {
        let order = []
        for (let i = 0; i < req.body["products"].length; i++) {
            order[i] = await Cart.create({
                user_id: req.body["user_id"],
                address_id: req.body["address_id"],
                product_id: req.body["products"][i]["product_id"],
                quantity: req.body["products"][i]["quantity"],
            })
        }

        // update product quantity
        for (const element of req.body["products"]) {
            const product = await Product.findOne({
                where: {id: element["product_id"]},
            })
            await Product.update({
                quantity: product["quantity"] - element["quantity"],
            }, {
                where: {id: element["product_id"]},
            })
        }

        return successResponse(res, order, 201, "Cart created successfully")
    }
}

// get all orders for user
exports.getAllCartsForUser = async (req, res, next) => {

    // check if user is in body
    if (!req.body.user) {
        return next(new ApiError("You are not authorized to get orders", 401))
    }

    const orders = await Cart.findAll({
        where: {user_id: req.body.user["id"]},
        include: [
            {
                model: Address,
                attributes: ['id', 'address', 'city', 'state', 'country', 'zip_code'],
            },
            {
                model: Product,
                attributes: ['id', 'title', 'description', 'price', 'image', 'category_id', 'sub_category_id', 'quantity', 'user_id', 'status'],
            },
        ],
    })
    return successResponse(res, orders, 200, "Carts found successfully")
}

// delete cart for user
exports.deleteCartForUser = async (req, res, next) => {

    // check if product in cart is owned by user
    const cart = await Cart.findOne({
        where: {id: req.body["cart_id"], user_id: req.body.user["id"]},
    })

    if (!cart) {
        return next(new ApiError("You are not authorized to delete this cart", 401))
    }

    // delete product fro cart and update product quantity
    await cart.destroy()
    await Product.update({
        quantity: cart["product"]["quantity"] + cart["quantity"],
    }, {
        where: {id: cart["product"]["id"]},
    })

    return successResponse(res, null, 200, "Product deleted successfully")
}

// validate cart input [ create cart ]
validateInputCart = async (products, user_id, address_id, next) => {

    // check if address is found in database and is owned by user
    const addressFound = await Address.findOne({
        where: {id: address_id},
    })

    if (!addressFound) {
        return next(new ApiError("Address not found", 404))
    }


    // loop in products and check quantity and status
    for (const element of products) {
        const product = await Product.findOne({
            where: {id: element["product_id"]},
        })


        if (!product) {
            return next(new ApiError("Product not found", 404))
        }

        // check if product quantity is available
        if (product["quantity"] < element["quantity"]) {
            return next(new ApiError("can`t create cart , the maximum quantity is " + product['quantity'], 400))
        }

        // check if product status is available
        if (product["status"] !== "available") {
            console.log("HERE")
            console.log(product["status"])
            return next(new ApiError("can`t create cart , the product is not available", 400))
        }

        // check if product is owned by user
        if (product["user_id"] !== user_id) {
            return next(new ApiError("You are not authorized to create cart with this product", 401))
        }
    }
    return true

}
