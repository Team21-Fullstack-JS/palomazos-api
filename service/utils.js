const { Review } = require("../model/Review");

function convertReviewsIntoInstances(reviews) {
    return reviews
        .map(review => Review.build(review.dataValues));
}

async function getCommentFromReview(review) {
    return await review.getComment();
}

async function getMovieFromReview(review) {
    return await review.getMovie();
}

async function getUserFromReview(review) {
    return await review.getUser();
}

module.exports = {
    convertReviewsIntoInstances,
    getCommentFromReview,
    getUserFromReview,
    getMovieFromReview
}