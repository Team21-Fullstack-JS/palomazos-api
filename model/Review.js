const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/Connection");
class Review extends Model {}

exports.Review = Review;

const Review = sequelize.define(
    "reviews",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.BIGINT,
      references: {
        model: "users",
        key: "id",
      },
    },
    id_comment: {
      type: DataTypes.BIGINT,
      references: {
        model: "comments",
        key: "id",
      },
    },
    id_movie: {
      type: DataTypes.BIGINT,
      references: {
        model: "movies",
        key: "id",
      },
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
  },
  {
    sequelize,
    modelName: "reviews",
    timestamps: true,
  }
);
