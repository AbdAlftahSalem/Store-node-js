module.exports = (db, type) => db.define('Coupon', {

    id: {
        type: type.INTEGER, primaryKey: true, autoIncrement: true,
    },

    code: {
        type: type.STRING, allowNull: false, unique: true,
    },

    discount: {
        type: type.INTEGER, allowNull: false,
    },

    createdAt: {
        type: type.DATE, allowNull: false,
    },

    updatedAt: {
        type: type.DATE, allowNull: false,
    },

    expireAt: {
        type: type.DATE, allowNull: false,
    },

    user_id: {
        type: type.INTEGER, allowNull: false,
    },


}, {

    freezeTableName: true, timestamps: true, tableName: 'coupon',
});