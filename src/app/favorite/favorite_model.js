module.exports = (db, type) => db.define('Favorite', {

    id: {
        type: type.INTEGER, primaryKey: true, autoIncrement: true,
    },
    user_id: {
        type: type.INTEGER, allowNull: false,
    },
    product_id: {
        type: type.INTEGER, allowNull: false,
    },
    createdAt: {
        type: type.DATE, allowNull: false,
    },
    updatedAt: {
        type: type.DATE, allowNull: false,
    },


}, {

    freezeTableName: true, timestamps: true, tableName: 'favorite',
});