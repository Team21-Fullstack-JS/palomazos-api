const { Review } = require('../model/Review');
const {where} = require("sequelize");


exports.getById = function (id) {
    return Review.findByPk(id);
}

exports.getAllReviewsFromMovie = function (id_movie) {
    return Review.findAll({
        where: {
            id_movie: id_movie,
        }
    });
}

exports.getAllReviewsFromUser = function (id_user) {
    return Review.findAll({
        where: {
            id_user: id_user,
        }
    });
}

exports.getReviewFromComment = function (id_comment) {
    return Review.findOne({
        where: {
            id_comment: id_comment,
        }
    });
}

exports.create = function (review) {
    return Review.create(review);
};

exports.update = function (id, review) {
    return Review.update(review, {
        where: {
            id:id
        }
    });
};

exports.deleteReviewById = function (id) {
    return Review.destroy({
        where: {
            id:id
        }
    });
};

