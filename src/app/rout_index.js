const AuthRout = require("../app/auth/auth_rout");
const CategoryRout = require("../app/category/category_rout");
const ProductRout = require("../app/product/product_rout");
const AddressRout = require("../app/address/address_rout");
const OrderRout = require("./cart/cart_rout");
const ReviewRout = require("../app/review/review_rout");
const FavoriteRout = require("../app/favorite/favorite_rout");
const CouponRout = require("../app/coupon/coupon_rout");

const mountRoutes = (app) => {
    app.use('/api/v1/auth', AuthRout)
    app.use('/api/v1/categories', CategoryRout)
    app.use('/api/v1/products', ProductRout)
    app.use('/api/v1/address', AddressRout)
    app.use('/api/v1/orders', OrderRout)
    app.use('/api/v1/reviews', ReviewRout)
    app.use('/api/v1/favorites', FavoriteRout)
    app.use('/api/v1/coupons', CouponRout)
};

module.exports = mountRoutes;
