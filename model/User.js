const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/Connection');
class User extends Model {
}

exports.User = User;

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
        allowNull: false
    },
    lastName:  {
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 50],
        },
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    }
}, {
    sequelize,
    modelName: 'users',
    timestamps: false
});