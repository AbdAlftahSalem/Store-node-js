const {Product, OrderItem, Address, Order} = require("../../models_index")

const successResponse = require("../../../utils/response_handel/success_handeler")
const {ApiError} = require("../../../utils/response_handel/error_handeler");

// create order item
exports.createOrderItem = async (req, res, next) => {

    // add user_id to body
    req.body["user_id"] = req.body.user["id"]

    // check if order_id is found in database and is owned by user
    const orderFound = await Order.findOne({
        where: {id: req.body["order_id"]},
    })

    if (!orderFound) {
        return next(new ApiError("Order not found", 404))
    }

    // prepare order item to save in database
    for (const element of req.body["product"]) {
        element["order_id"] = req.body["order_id"]
        element["user_id"] = req.body["user_id"]
    }

    // create order item for array of products
    const orderItem = await OrderItem.bulkCreate(req.body["product"])

    // update product quantity
    for (const element of req.body["product"]) {
        const product = await Product.findOne({
            where: {id: element["product_id"]},
        })
        await Product.update({
            quantity: product["quantity"] - element["quantity"],
        }, {
            where: {id: element["product_id"]},
        })
    }

    return successResponse(res, orderItem, 201, "Order item created successfully")
}
