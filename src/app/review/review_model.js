module.exports = (db, type) => db.define('Review', {

    id: {
        type: type.INTEGER, primaryKey: true, autoIncrement: true,
    },
    user_id: {
        type: type.INTEGER, allowNull: false,
    },
    product_id: {
        type: type.INTEGER, allowNull: false,
    },
    review: {
        type: type.STRING, allowNull: false,
    },
    createdAt: {
        type: type.DATE, allowNull: false,
    },
    updatedAt: {
        type: type.DATE, allowNull: false,
    },
    rating: {
        type: type.INTEGER, allowNull: false,
    },

}, {
    freezeTableName: true, timestamps: true, tableName: 'review',
});