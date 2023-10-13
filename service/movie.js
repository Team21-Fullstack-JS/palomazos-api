const { Movie } = require('../model/Movie');

const {
    convertReviewsIntoInstances,
    getCommentFromReview,
    getUserFromReview
} = require("./utils");

exports.getAllMovies = async function (isReviews) {

    //Obtenermos el listado de las movies que tiene reviews
    const movies = await Movie.findAll();

    //Si no se requieren las reviews, retornamos las movies con sus datos
    if (!isReviews) return movies;

    //Si se requieren las reviews, retornamos las movies con sus reviews, comments y users
    return await Promise.all(movies.map( async ( movie) => {

        //Obtenemos las reviews del usuario y despues las convertimos en instancias de Review
        const reviews = await movie.getReviews()
            .then( reviews => convertReviewsIntoInstances(reviews));

        //Obtenemos el comment y el user de cada review
        const reviewsWithCommentsAndUsers = await Promise.all(reviews.map( async (review) => {

            const comment = await getCommentFromReview(review);
            const user = await getUserFromReview(review);

            return { ...review.dataValues, comment, user: user.publicData() };
        }))

        return { ...movie.dataValues, reviews: reviewsWithCommentsAndUsers}
    }));
}

exports.getById = function (id) {
    return Movie.findByPk(id);
}

exports.getByTitle = function (title) {
    return Movie.findOne({
        where: {
            title:title,
        }
    });
};

exports.getByYear = function(year) {
    return Movie.findAll({
        where: {
            year: year
        }
    });

};

exports.create = function (movie) {
    return Movie.create(movie);
};

exports.update = function (id, movie) {
    return Movie.update(movie, {
        where: {
            id:id
        }
    });
};

exports.deletelogicById = function (id) {
    return Movie.update({ isActive: false}, {
        where: {
            id:id
        }
    });
};