module.exports = (db, type) => db.define('Category', {
    id: {
        type: type.INTEGER, primaryKey: true, autoIncrement: true,
    }, name: {
        type: type.STRING, allowNull: false, unique: true,
    }, image: {
        type: type.STRING, allowNull: false,
    }, parent_category: {
        type: type.INTEGER, allowNull: true, defaultValue: null,
    }, createdAt: {
        type: type.DATE, allowNull: false,

    }, updatedAt: {
        type: type.DATE, allowNull: false,
    },
}, {

    freezeTableName: true, timestamps: true, tableName: 'category',
});