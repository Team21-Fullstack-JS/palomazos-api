const { Movie } = require('../model/Movie');

exports.getAllMovies = function () {
    return Movie.findAll();
}

exports.getById = function (id) {
    return Movie.findByPk(id);
}

exports.getByTitle = function (title) {
    return Movie.findOne({
        where: {
            title:title
        }
    });
};

exports.getByDirector = function(director) {
    return Movie.findOne({
        where: {
            director: director
        }
    });
};

exports.getByYear = function(year) {
    return Movie.findOne({
        where: {
            year: year
        }
    })

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