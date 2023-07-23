module.exports = (db, type) => db.define('Order', {

    id: {
        type: type.INTEGER, primaryKey: true, autoIncrement: true,
    },
    user_id: {
        type: type.INTEGER, allowNull: false,
    },
    product_id: {
        type: type.INTEGER, allowNull: false,
    },
    quantity: {
        type: type.INTEGER, allowNull: false,
    },
    createdAt: {
        type: type.DATE, allowNull: false,
    },
    updatedAt: {
        type: type.DATE, allowNull: false,
    },
    status_order: {
        type: type.ENUM, values: ['pending', 'in delivery', 'delivered'], defaultValue: 'pending',
    },
}, {
    freezeTableName: true, timestamps: true, tableName: 'order',
});