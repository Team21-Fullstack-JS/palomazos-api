const { Review } = require('../model/Review');

const {getById, getAllReviewsFromMovie, getAllReviewsFromUser, getReviewFromComment, create, update, deleteReviewById} = require('../service/review');

exports.getAllReviewsFromMovie = async function (req, res) {
    const reviewsFromMovie = await getAllReviewsFromMovie(req.params.id_movie);

    if (reviewsFromMovie.length <= 0) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'No hay reviews.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Reviews de película elegida se ha obtenido exitosamente.',
            data: reviewsFromMovie
        });
}

exports.getAllReviewsFromUser = async function (req, res) {
    const reviewsFromUser = await getAllReviewsFromUser(req.params.id_user);

    if (reviewsFromUser.length <= 0) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'No hay reviews.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Reviews de user seleccionado se obtuvieron exitosamente.',
            data: reviewsFromUser
        });
}

exports.getReviewFromComment = async function (req, res) {
    const reviewFromComment = await getReviewFromComment(req.params.id_comment);

    if (!reviewFromComment) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'Review no encontrada.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Review encontrada.',
            data: reviewFromComment
        });
}

exports.getById = async function (req, res) {
    const review = await getById(req.params.id);

    if (!review) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'Review no encontrada.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Review encontrada.',
            data: review
        });
}

exports.create = async function (req, res) {
    const reviewDb = await create(req.body);

    return res.status(201).json({
        error: false,
        code: 201,
        message: "Review creado exitosamente",
        data: reviewDb
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
                message: 'No se pudo actualizar la review.',
                data: null
            });
    }

    const reviewDb = await getById(id);

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Review actualizada exitosamente.',
            data: reviewDb
        });
};

exports.deleteReviewById = async function (req, res) {
	const { id } = req.params;

    const isDeleted = await deleteReviewById(id);

    if( isDeleted[0] < 1 ) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'No se pudo eliminar la review.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Review eliminada exitosamente.',
            data: null
        });
};
