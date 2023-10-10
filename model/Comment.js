const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/Connection');

class Comment extends Model {}

exports.Comment = Comment;

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING(500),
        field: 'first_name',
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'comments',
    timestamps: true
});