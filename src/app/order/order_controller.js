const {Product, Order, Address, OrderItem} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");
const {createOrderItem} = require("./order_item/order_item_controller");

// create order
exports.createOrder = async (req, res, next) => {

    // add user_id to body
    req.body["user_id"] = req.body.user["id"]

    const statusCheck = await validateInputOrder(req.body["product"], req.body.user["id"], req.body["address_id"], next)
    console.log(statusCheck)
    if (!statusCheck) {
        return next(new ApiError("can`t create order", 400))
    }
    // req.body['product_ids'] = req.body["product"].map(({product_id}) => ({product_id}))

    // create order for array of products
    const order = await Order.create(req.body)

    // add order_id to body
    req.body["order_id"] = order["id"]

    await createOrderItem(req, res, next)

    // return successResponse(res, order, 201, "Order created successfully")

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
                    }
                ],
                attributes: {
                    exclude: ['order_id', 'product_id']
                }

            },
            {
                model: Address,
                attributes: {
                    exclude: ['user_id']
                }
            },
        ],
        attributes: {
            exclude: ['user_id', 'address_id']
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