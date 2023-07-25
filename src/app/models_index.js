const Sequelize = require('sequelize');
const db = require('../config/database_config');

//  models
const UserModel = require('./auth/user_model');
const OrderModel = require('./order/order_model');
const ProductModel = require('./product/product_model');
const CategoryModel = require('./category/category_model');
const AddressModel = require('./address/address_model');
const ReviewModel = require('./review/review_model');
const FavoriteModel = require('./favorite/favorite_model');
const CouponModel = require('./coupon/coupon_model');


//  create objects
const User = UserModel(db, Sequelize);
const Order = OrderModel(db, Sequelize);
const Product = ProductModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);
const Address = AddressModel(db, Sequelize);
const Review = ReviewModel(db, Sequelize);
const Favorite = FavoriteModel(db, Sequelize);
const Coupon = CouponModel(db, Sequelize);

// Associations
User.hasMany(Order, {foreignKey: 'user_id'});
Order.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(Product, {foreignKey: 'user_id'});
Product.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(Address, {foreignKey: 'user_id'});
Address.belongsTo(User, {foreignKey: 'user_id'});

Category.hasMany(Product, {foreignKey: 'category_id'});
Product.belongsTo(Category, {foreignKey: 'category_id'});

// Order belongs to a Product
Product.hasMany(Order, {foreignKey: 'product_id'});
Order.belongsTo(Product, {foreignKey: 'product_id'});

// Order belongs to an Address
Address.hasMany(Order, {foreignKey: 'address_id'});
Order.belongsTo(Address, {foreignKey: 'address_id'});

// Product has many reviews
Product.hasMany(Review, {foreignKey: 'product_id'});
Review.belongsTo(Product, {foreignKey: 'product_id'});

// review belongs to a user
User.hasMany(Review, {foreignKey: 'user_id'});
Review.belongsTo(User, {foreignKey: 'user_id'});

// user has many favorites
User.hasMany(Favorite, {foreignKey: 'user_id'});
Favorite.belongsTo(User, {foreignKey: 'user_id'});

// product has many favorites
Product.hasMany(Favorite, {foreignKey: 'product_id'});
Favorite.belongsTo(Product, {foreignKey: 'product_id'});

//  coupon belongs to a user
User.hasMany(Coupon, {foreignKey: 'user_id'});
Coupon.belongsTo(User, {foreignKey: 'user_id'});

//  coupon belongs to a order
Order.hasMany(Coupon, {foreignKey: 'order_id'});
Coupon.belongsTo(Order, {foreignKey: 'order_id'});

//  coupon belongs to a product
Product.hasMany(Coupon, {foreignKey: 'product_id'});
Coupon.belongsTo(Product, {foreignKey: 'product_id'});


Category.belongsTo(Category, {
    as: 'parentCategory',
    foreignKey: 'parent_category',
    targetKey: 'id',
});

//  sync db
db.sync({force: false}).then(_ => console.log("db synced")).catch(e => console.log(e))

module.exports = {
    User, Order, Product, Category, Address, Review, Favorite, Coupon
};
