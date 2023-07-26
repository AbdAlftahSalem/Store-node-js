module.exports = (db, type) => db.define('Order', {

    user_id: {
        type: type.INTEGER,
        allowNull: false,
    },
    coupon_id: {
        type: type.INTEGER,
        allowNull: false,
    },
    discount: {
        type: type.FLOAT,
        defaultValue: 0,
    },
    total: {
        type: type.FLOAT,
    },
    createdAt: {
        type: type.DATE,
        defaultValue: type.NOW,
    },
    updatedAt: {
        type: type.DATE,
        defaultValue: type.NOW,
    },

    status: {
        type: type.ENUM('pending', 'processing', 'shipped', 'delivered'),
        defaultValue: 'pending',
    },
    address_id: {
        type: type.INTEGER,
    },

}, {

    freezeTableName: true, timestamps: true, tableName: 'order',
});