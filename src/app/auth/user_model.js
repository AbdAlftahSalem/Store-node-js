module.exports = (db, type) => db.define('User', {
    id: {
        type: type.INTEGER, primaryKey: true, autoIncrement: true,
    }, username: {
        type: type.STRING, allowNull: false, unique: true,
    }, email: {
        type: type.STRING, allowNull: false, unique: true,
    }, password: {
        type: type.STRING, allowNull: false,
    }, phone: {
        type: type.STRING, allowNull: false, unique: true,
    },
    role: {
        type: type.ENUM('user', 'admin', 'manger'), defaultValue: 'user',
    }

}, {
    freezeTableName: true, timestamps: true, tableName: 'user',
});