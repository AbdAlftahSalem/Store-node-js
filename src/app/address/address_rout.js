const express = require("express")
const validator = require("../address/address_validator")


const {
    createAddress, deleteAddress, editAddress, getAllAddresses, getAllAddressesForUser
} = require("./address_controller")


const router = express.Router();


router.route("/get-address-for-user").get(validator.getAllAddressesForUser, getAllAddressesForUser)
router.route("/get-addresses").get(getAllAddresses)
router.route("/create-address").post(validator.createAddress, createAddress)
router.route("/edit-address").put(validator.updateAddress, editAddress)
router.route("/delete-address").delete(validator.deleteAddress, deleteAddress)


module.exports = router;
