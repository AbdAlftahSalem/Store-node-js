module.exports = (db, type) => db.define('Address', {
    id: {
        type: type.INTEGER, primaryKey: true, autoIncrement: true,
    }, user_id: {
        type: type.INTEGER, allowNull: false,
    }, address: {
        type: type.STRING, allowNull: false,
    }, city: {
        type: type.STRING, allowNull: false,
    },

    state: {
        type: type.STRING, allowNull: false,
    },

    country: {
        type: type.STRING, allowNull: false,
    },

    zip_code: {
        type: type.STRING, allowNull: false,
    },

    createdAt: {
        type: type.DATE, allowNull: false,
    }, updatedAt: {
        type: type.DATE, allowNull: false,
    }, latitude: {
        type: type.STRING, allowNull: false,
    }, longitude: {
        type: type.STRING, allowNull: false,
    },

}, {

    freezeTableName: true, timestamps: true, tableName: 'address',
});