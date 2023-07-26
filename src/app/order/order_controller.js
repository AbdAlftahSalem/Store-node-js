const {Product, Order, Address, OrderItem, Coupon} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");
const {createOrderItem} = require("./order_item/order_item_controller");


// create order
exports.createOrder = async (req, res, next) => {

    // add user_id to body
    req.body["user_id"] = req.body.user["id"]

    const statusCheck = await validateInputOrder(req.body["product"], req.body.user["id"], req.body["address_id"], next)
    if (!statusCheck) {
        return next(new ApiError("can`t create order", 400))
    }

    // calculate total price
    await calculatePrice(req);

    // create order for array of products
    const order = await Order.create(req.body)

    // add order_id to body
    req.body["order_id"] = order["id"]

    // create order item for array of products
    await createOrderItem(req, res, next)

}

// get all orders for user
exports.getAllOrdersForUser = async (req, res, next) => {

    // get all orders for user and order items
    const orders = await Order.findAll({
        where: {user_id: req.body.user["id"]},
        include: [
            {
                model: OrderItem,
                include: [
                    {
                        model: Product,
                    },
                ], attributes: {
                    exclude: ['order_id', 'product_id']
                }

            },
            {
                model: Address, attributes: {
                    exclude: ['user_id']
                }
            },
            {model: Coupon}
        ], attributes: {
            exclude: ['user_id', 'address_id', "coupon_id", "discount"]
        }
    })

    return successResponse(res, orders, 200, "Orders retrieved successfully")

}


// validate order input [ create order ]
validateInputOrder = async (products, user_id, address_id, next) => {

    // check if address is found in database and is owned by user
    const addressFound = await Address.findOne({
        where: {id: address_id},
    })

    if (!addressFound) {
        return next(new ApiError("Address not found", 404))
    }


    // loop in products and check quantity and status
    for (const element of products) {
        console.log(element["product_id"])
        const product = await Product.findOne({
            where: {id: element["product_id"]},
        })

        if (!product) {
            return next(new ApiError("Product not found", 404))
        }

        // check if product quantity is available
        if (product["quantity"] < element["quantity"]) {
            return next(new ApiError("can`t create order , the maximum quantity is " + product['quantity'], 400))
        }

        // check if product status is available
        if (product["status"] !== "available") {
            console.log("HERE")
            console.log(product["status"])
            return next(new ApiError("can`t create order , the product is not available", 400))
        }

    }
    return true

}

async function calculatePrice(req) {
    let totalPrice = 0
    for (const element of req.body["product"]) {
        const product = await Product.findOne({
            where: {id: element["product_id"]},
        })
        totalPrice += product["price"] * element["quantity"]
    }

    // check coupon and calculate discount
    if (req.body["coupon_id"]) {
        const coupon = await Coupon.findOne({
            where: {id: req.body["coupon_id"]},
        })
        totalPrice -= coupon["discount"]
    }
    // add total price to body
    req.body["total"] = totalPrice
}