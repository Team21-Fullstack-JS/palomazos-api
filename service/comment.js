const { Comment } = require('../model/Comment');
const { where } = require("sequelize");

exports.newComment = function (content) {
    return Comment.create(content);
}

exports.getById = function (id) {
    return Comment.findByPk(id);
}

exports.getReviewComment = async function (reviewId) {
    return Comment.findOne(
        {
            where: { review_id: reviewId }
        }
    );
}

exports.update = function (id, content) {
    return Comment.update(content, {
        where: {
            id: id,
            isActive: true
        }
    });
};

exports.deleteLogicById = function (id) {
    return Comment.update({ isActive: false }, {
        where: {
            id: id
        }
    });
}
