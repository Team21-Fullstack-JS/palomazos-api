const { DataTypes, Model } = require("sequelize");
const {sequelize} = require('../database/Connection');
class Movie extends Model {
}

exports.Movie = Movie;

Movie.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        field: 'title',
    },
    year: {
        type: DataTypes.STRING,
        field: 'release_year',
    },
    overview: DataTypes.STRING,
    poster_path: DataTypes.STRING,
    backdrop_path: DataTypes.STRING,
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    }
}, {
    sequelize,
    modelName: 'movies',
    timestamps: false
});