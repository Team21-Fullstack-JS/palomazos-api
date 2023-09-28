const { Movie } = require('../model/Movie');
const {
    create,
    getAllMovies,
    getById,
    getByTitle,
    getByDirector,
    getByYear,
} = require('../service/movie');

exports.getAllMovies = async function (req, res) {
    const movies = await getAllMovies();

    if (movies.length <= 0) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'No hay películas.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Lista de películas obtenida exitosamente.',
            data: movies
        });
}

exports.getById = async function (req, res) {
    const movie = await getById(req.params.id);

    if (!movie) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'Película no encontrada.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Película encontrada.',
            data: movie
        });
}

exports.getByTitle = async function (req, res) {
    const movie = await getByTitle(req.params.title);

    if (!movie) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'Película no encontrada.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Película encontrada.',
            data: movie
        });
}

exports.getByTitle = async function (req, res) {
    const movie = await getByTitle(req.params.title);

    if (!movie) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'Película no encontrada.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Película encontrada.',
            data: movie
        });
}

exports.getByDirector = async function (req, res) {
    const movie = await getByDirector(req.params.director);

    if (!movie) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'Película no encontrada.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Película encontrada.',
            data: movie
        });
}

exports.getByYear = async function (req, res) {
    const movie = await getByYear(req.params.year);

    if (!movie) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'Película no encontrada.',  
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Película encontrada.',
            data: movie
        });
}

exports.create = async function (req, res) {
    const moviedb = await create(req.body);

    return res.status(201).json({
        error: false,
        code: 201,
        message: "Pelicula creada exitosamente",
        data: moviedb
    })
}



