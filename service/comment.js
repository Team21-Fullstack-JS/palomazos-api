const { Comment } = require("../model/Comment");
exports.create = function (comment) {
    return Comment.create(comment);
};