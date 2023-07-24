const express = require("express")
const validator = require("../review/review_controller")
const {Review} = require("../models_index")

const {
    addReview, deleteReview, editReview, getAllReviewsForProduct
} = require("./review_controller")
const Auth = require("../auth/auth_controller");

const {uploadFile} = require("../../middlewere/upload_file");
const {ApiError} = require("../../utils/response_handel/error_handeler");


const router = express.Router();

router.route("/get-reviews-for-product").get(getAllReviewsForProduct)
router.route("/add-review").post((req, res, next) => Auth.protectRout(req, res, next, ["user"]), validator.addReview, addReview)
router.route("/edit-review").put((req, res, next) => Auth.protectRout(req, res, next, ["user"]), validator.editReview, editReview)
router.route("/delete-review").delete((req, res, next) => Auth.protectRout(req, res, next, ["user"]), validator.deleteReview, deleteReview)


module.exports = router;
