const {Order, Address, Product} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");

const env = require("dotenv");
env.config({path: "./config.env"})

// create order
exports.createOrder = async (req, res, next) => {
    // check if address exist
    const address = await Address.findOne({
        where: {id: req.body["address_id"]},
    })

    if (!address) {
        return next(new ApiError("Address not found", 404))
    }

    // check if user is owner of address
    if (req.body.user["id"] !== address["user_id"]) {
        return next(new ApiError("You are not authorized to create order with this address", 401))
    }

    // check if product exist
    const product = await Product.findOne({
        where: {id: req.body["product_id"]},
    })

    if (!product) {
        return next(new ApiError("Product not found", 404))
    }

    // check if product quantity is available
    if (product["quantity"] < req.body["quantity"]) {
        return next(new ApiError("can`t create order , the maximum quantity is " + product['quantity'], 400))
    }

    // check if product status is available
    if (product["status"] !== "available") {
        return next(new ApiError("can`t create order , the product is not available", 400))
    }

    // create order
    const order = await Order.create(req.body)
    return successResponse(res, order, 201, "Order created successfully")
}

// get all orders for user
exports.getAllOrdersForUser = async (req, res, next) => {
    const orders = await Order.findAll({
        where: {user_id: req.body.user["id"]},
    })
    return successResponse(res, orders, 200, "Orders found successfully")
}

// get all orders for admin or manager
exports.getAllOrdersForAdmin = async (req, res, next) => {
    const orders = await Order.findAll()
    return successResponse(res, orders, 200, "Orders found successfully")
}

// edit order for user
exports.editOrderForUser = async (req, res, next) => {

    // check if order exist
    const order = await Order.findOne({
        where: {id: req.body["order_id"]},
    })

    if (!order) {
        return next(new ApiError("Order not found", 404))
    }

    // check if user is owner of order
    if (req.body.user["id"] !== order["user_id"]) {
        return next(new ApiError("You are not authorized to edit this order", 401))
    }

    // check if product exist
    const product = await Product.findOne({
        where: {id: req.body["product_id"]},
    })

    if (!product) {
        return next(new ApiError("Product not found", 404))
    }

    // check if product quantity is available
    if (product["quantity"] < req.body["quantity"]) {
        return next(new ApiError("can`t edit order , the maximum quantity is " + product['quantity'], 400))
    }

    // check if product status is available
    if (product["status"] !== "available") {
        return next(new ApiError("can`t edit order , the product is not available", 400))
    }

    // update order
    const updatedOrder = await Order.update(req.body, {
        where: {id: req.body["order_id"]},
    })

    if (!updatedOrder) {
        return next(new ApiError("Order not found", 404))
    }

    return successResponse(res, updatedOrder, 200, "Order updated successfully")
}

// delete order for user

exports.deleteOrderForUser = async (req, res, next) => {

    // check if order exist
    const order = await Order.findOne({
        where: {id: req.body["order_id"]},
    })

    if (!order) {
        return next(new ApiError("Order not found", 404))
    }

    // check if user is owner of order
    if (req.body.user["id"] !== order["user_id"]) {
        return next(new ApiError("You are not authorized to delete this order", 401))
    }

    // delete order
    const deletedOrder = await Order.destroy({
        where: {id: req.body["order_id"]},
    })

    if (!deletedOrder) {
        return next(new ApiError("Order not found", 404))
    }

    return successResponse(res, null, 200, "Order deleted successfully")
}

// change order status
exports.changeOrderStatus = async (req, res, next) => {

    // check if order exist
    const order = await Order.findOne({
        where: {id: req.body["order_id"]},
    })

    if (!order) {
        return next(new ApiError("Order not found", 404))
    }

    // check if user is owner of order
    if (req.body.user["id"] !== order["user_id"]) {
        return next(new ApiError("You are not authorized to change status of this order", 401))
    }

    // update order status
    const updatedOrder = await Order.update(req.body, {
        where: {id: req.body["order_id"]},
    })

    if (!updatedOrder) {
        return next(new ApiError("Order not found", 404))
    }

    return successResponse(res, updatedOrder, 200, "Order status updated successfully")
}