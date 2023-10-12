const { User } = require('../model/User');
const { where} = require("sequelize");
const {Review} = require("../model/Review");
const {Comment} = require("../model/Comment");
const {Movie} = require("../model/Movie");

exports.signup = function (user) {
    return User.create(user);
}

exports.getAll = async function () {
    const users = await User.findAll(
        {
            where: { isActive: true }
        }
    );

    return users.map( (user) => user.publicData());
}

exports.getById = async function (id, isReviews) {
    const user = await User.findOne({
        where: {
            id: id,
            isActive: true
        }
    });

    if (!isReviews) return user.publicData();

    const reviews = await user.getReviews();

    const res = reviews
        .map( review => Review.build(review.dataValues));

    const reviewsWithComments = await Promise.all(res.map( async (review) => {
        const comment = await review.getComment();
        return { ...review.dataValues, comment: comment.dataValues };
    }));

    const reviewsWithCommentsAndMovies = await Promise.all(reviewsWithComments.map( async (review) => {
        const movie = await Movie.findByPk(review.movie_id);
        return { ...review, movie: movie.dataValues };
    }));

    return {...user.publicData(), reviews: reviewsWithCommentsAndMovies};
}

exports.getByEmail = function (email) {
    return User.findOne({
        where: {
            email: email,
            isActive: true
        }
    });
};

exports.update = function (id, user) {
    return User.update(user, {
        where: {
            id: id,
            isActive: true
        }
    });
};

exports.deleteLogicById = function (id) {
    return User.update({ isActive: false }, {
        where: {
            id: id
        }
    });
}