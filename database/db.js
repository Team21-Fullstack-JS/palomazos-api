const { connect, sync } = require('./Connection');
const { User } = require('../model/User');
const { Review } = require("../model/Review");
const { Movie } = require("../model/Movie");
const {Comment} = require("../model/Comment");

// Asociacion de la tabla 'users' con la tabla 'reviews'
User.hasMany(Review, {
    foreignKey: 'user_id'
});
Review.belongsTo(User, {
    foreignKey: 'user_id'
});

// Asociacion de la tabla 'movies' con la tabla 'reviews'
Movie.hasMany(Review, {
    foreignKey: 'movie_id'
});
Review.belongsTo(Movie, {
    foreignKey: 'movie_id'
});

// Asociacion de la tabla 'reviews' con la tabla 'comments'
Review.hasOne(Comment, {
    foreignKey: 'review_id'
});
Comment.belongsTo(Review, {
    foreignKey: 'review_id'
});

exports.initDatabase = async () => {
    await connect();
    await sync();
}