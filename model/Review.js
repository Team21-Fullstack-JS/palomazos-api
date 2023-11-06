const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/Connection");

const Review = sequelize.define("reviews",{
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 10,
      }
    },
    isCheck: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_check'
    }
  },
  {
    sequelize,
    modelName: "reviews",
    timestamps: true,
  }
);

exports.Review = Review;