const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/Connection");

class Comment extends Model {}

exports.Comment = Comment;

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING(255),
        field: 'content',
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    },
}, {
    sequelize,
    modelName: 'comments',
    timestamps: true
});
