const express = require("express")
const validator = require("../favorite/favorite_validator")


const {
    addProductToFavorite, getAllFavoriteProducts
} = require("./favorite_controller")

const Auth = require("../auth/auth_controller")

const router = express.Router();

router.route("/add-product-to-favorite").post(Auth.protectRout, validator.addToFavorite, addProductToFavorite)
router.route("/get-all-favorite-products").get(Auth.protectRout, getAllFavoriteProducts)

module.exports = router;
