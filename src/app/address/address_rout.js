const express = require("express")
const validator = require("../address/address_validator")


const {
    createAddress, deleteAddress, editAddress, getAllAddresses, getAllAddressesForUser
} = require("./address_controller")

const Auth = require("../auth/auth_controller")

const router = express.Router();


router.route("/get-address-for-user").get(Auth.protectRout, getAllAddressesForUser)
router.route("/get-addresses").get(Auth.protectRout, getAllAddresses)
router.route("/create-address").post(Auth.protectRout, validator.createAddress, createAddress)
router.route("/edit-address").put(Auth.protectRout, validator.updateAddress, editAddress)
router.route("/delete-address").delete(Auth.protectRout, validator.deleteAddress, deleteAddress)


module.exports = router;
