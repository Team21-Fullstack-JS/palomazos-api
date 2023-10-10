const { Movie } = require('../model/Movie');
const {
    create,
    getAllMovies,
    getById,
    getByTitle,
    getByYear,
    update,
    deletelogicById,
} = require('../service/movie');

const {
    create: createReview,
} = require('../service/review');

const {
    create: createComment,
} = require('../service/comment');

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

exports.update = async function (req, res) {
    const { id } = req.params;
    const content = req.body;

    const isUpdated = await update(id, { ...content });

    if( isUpdated[0] < 1 ) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'No se pudo actualizar la película.',
                data: null
            });
    }

    const moviedb = await getById(id);

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Película exitosamente.',
            data: moviedb
        });
};

exports.deletelogicById = async function (req, res) {
	const { id } = req.params;

    const isDeleted = await deletelogicById(id);

    if( isDeleted[0] < 1 ) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'No se pudo eliminar la película.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Película eliminada exitosamente.',
            data: null
        });
};

exports.createMovieReview = async function (req, res) {

    //Obtenemos los datos del usuario y la película
    const { id: user_id } = req.user;
    const { id: movie_id } = req.params;
    const { rate, comment } = req.body;

    //Primero creamos la review
    const review = await createReview({
        rate,
        user_id,
        movie_id,
    });

    //Datos de la review creada
    const { dataValues: data } = review;

    //Si no se pudo crear la review, retornamos un error
    if (!data) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'No se pudo crear la review.',
                data: null
            });
    }

    //Si existe un comentario del usuario, creamos uno en la BD
    //usando el ID de la review creada
    let commentDb = null;
    if (comment) {
        commentDb = await createComment({
            id_review: data.id,
            content: comment.content,
        });
    }

    const body = {
        ...data,
        comment: commentDb,
    }

    return res.status(201)
        .json({
            error: false,
            code: 201,
            message: 'Review creado exitosamente.',
            data: body
        });
}

