const { User } = require('../model/User');
const { where} = require("sequelize");

const {
    convertReviewsIntoInstances,
    getCommentFromReview,
    getMovieFromReview
} = require("./utils");

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

exports.getUserBy = async function (isEmail, searchBy, isReviews) {

    const searchById = {
            id: searchBy,
            isActive: true
    };

    const searchByEmail = {
            email: searchBy,
            isActive: true
    };

    const user = await User.findOne({
        where: isEmail ? {...searchByEmail} : {...searchById}
    });

    if (!isReviews) return user;

    //Obtenemos las reviews del usuario y despues las convertimos en instancias de Review
    const reviews = await user.getReviews()
        .then( reviews => convertReviewsIntoInstances(reviews));

    //Obtenemos el comment y movie de cada review
    const reviewsWithCommentsAndMovies = await Promise.all(reviews.map( async (review) => {

        const comment = await getCommentFromReview(review);
        const movie = await getMovieFromReview(review);

        return { ...review.dataValues, comment, movie };
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