const Sequelize = require('sequelize');
const db = require('../config/database_config');

//  models
const UserModel = require('./auth/user_model');
const OrderModel = require('./order/order_model');
const ProductModel = require('./product/product_model');
const CategoryModel = require('./category/category_model');
const AddressModel = require('./address/address_model');


//  create objects
const User = UserModel(db, Sequelize);
const Order = OrderModel(db, Sequelize);
const Product = ProductModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);
const Address = AddressModel(db, Sequelize);


// Associations
User.hasMany(Order, {foreignKey: 'user_id'});
Order.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(Product, {foreignKey: 'user_id'});
Product.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(Address, {foreignKey: 'user_id'});
Address.belongsTo(User, {foreignKey: 'user_id'});

Category.hasMany(Product, {foreignKey: 'category_id'});
Product.belongsTo(Category, {foreignKey: 'category_id'});

Category.belongsTo(Category, {
    as: 'parentCategory',
    foreignKey: 'parent_category',
    targetKey: 'id',
});

//  sync db
db.sync({force: false}).then(_ => console.log("db synced")).catch(e => console.log(e))

module.exports = {
    User, Order, Product, Category, Address
};
