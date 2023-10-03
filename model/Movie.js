const { DataTypes, Model } = require("sequelize");
const {sequelize} = require('../database/Connection');
class Movie extends Model {
}

exports.Movie = Movie;

Movie.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        field: 'movie_title',
    },
    director: {
        type:DataTypes.STRING,
        field: 'director'
    },
    year: {
        type: DataTypes.INTEGER,
        field: 'release_year',
        validate:{
            len: [4],
        },
    },
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