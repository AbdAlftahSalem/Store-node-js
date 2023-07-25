const express = require("express")
const validator = require("../review/review_validation")
const {Review} = require("../models_index")

const {
    addReview, deleteReview, editReview, getAllReviewsForProduct
} = require("./review_controller")
const Auth = require("../auth/auth_controller");


const router = express.Router();

// router.route("/get-reviews-for-product").get(getAllReviewsForProduct)
router.route("/add-review").post(Auth.protectRout, validator.addReview, addReview)
// router.route("/edit-review").put(Auth.protectRout, validator.editReview, editReview)
// router.route("/delete-review").delete(Auth.protectRout, validator.deleteReview, deleteReview)


module.exports = router;
