const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/Connection');
class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'users',
});