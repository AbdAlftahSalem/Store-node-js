const {Address} = require("../models_index")

const successResponse = require("../../utils/response_handel/success_handeler")
const {ApiError} = require("../../utils/response_handel/error_handeler");

const env = require("dotenv");
env.config({path: "./config.env"})

// create address
exports.createAddress = async (req, res, next) => {
    const address = await Address.create(req.body)
    return successResponse(res, address, 201, "Address created successfully")
}

// get all addresses
exports.getAllAddresses = async (req, res, next) => {
    const addresses = await Address.findAll()
    return successResponse(res, addresses, 200, "Addresses found successfully")
}

// edit address
exports.editAddress = async (req, res, next) => {
    // check if address exist
    const address = await Address.findOne({
        where: {id: req.body["address_id"]},
    })

    if (!address) {
        return next(new ApiError("Address not found", 404))
    }

    // check if user is owner of address
    if (req.body.user["id"] !== address["user_id"]) {
        return next(new ApiError("You are not authorized to edit this address", 401))
    }

    // update address
    const updatedAddress = await Address.update(req.body, {
        where: {id: req.body["address_id"]},
    })
    if (!updatedAddress) {
        return next(new ApiError("Address not found", 404))
    }
    return successResponse(res, updatedAddress, 200, "Address updated successfully")
}

// delete address
exports.deleteAddress = async (req, res, next) => {
    // check if address exist
    const address = await Address.findOne({
        where: {id: req.body["address_id"]},
    })

    if (!address) {
        return next(new ApiError("Address not found", 404))
    }

    // check if user is owner of address
    if (req.body.user["id"] !== address["user_id"]) {
        return next(new ApiError("You are not authorized to delete this address", 401))
    }

    // delete address
    const deletedAddress = await Address.destroy({
        where: {id: req.body["address_id"]},
    })
    if (!deletedAddress) {
        return next(new ApiError("Address not found", 404))
    }
    return successResponse(res, deletedAddress, 200, "Address deleted successfully")
}

// get all addresses for user
exports.getAllAddressesForUser = async (req, res, next) => {
    const addresses = await Address.findAll({
        where: {user_id: req.body["user_id"]},
    })
    if (!addresses) {
        return next(new ApiError("Addresses not found", 404))
    }
    return successResponse(res, addresses, 200, "Addresses found successfully")
}
