module.exports = (db, type) => db.define('Product', {

    id: {
        type: type.INTEGER, primaryKey: true, autoIncrement: true,

    },
    title: {
        type: type.STRING, allowNull: false,
    },
    description: {
        type: type.STRING, allowNull: false,
    },
    price: {
        type: type.INTEGER, allowNull: false,
    },
    image: {
        type: type.STRING, allowNull: false,
    },
    category_id: {
        type: type.INTEGER, allowNull: false,
    },
    createdAt: {
        type: type.DATE, allowNull: false,
    },
    updatedAt: {
        type: type.DATE, allowNull: false,
    },
    quantity: {
        type: type.INTEGER, allowNull: false,
    },
    user_id: {
        type: type.INTEGER, allowNull: false,
    },
    status: {
        type: type.ENUM, values: ['active', 'inactive'], defaultValue: 'inactive',
    },


}, {
    freezeTableName: true, timestamps: true, tableName: 'product',
});