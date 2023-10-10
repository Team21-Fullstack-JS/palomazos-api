const { Comment } = require('../model/Comment');

const {
      newComment,
      getById,
      getReviewComment,  
      update, 
      deleteByLogic
} = require('../service/comment');

exports.getReviewComment = async function (req, res) {
    const content = await getReviewComment(req.params.review_id);

    if (content.length <= 0) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'No hay comentario.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Comentarios obtenido exitosamente.',
            data: content
        });
}

exports.newComment = async function (req, res) {
    const content = await newComment(req.body);

    return res.status(201).json({
        error: false,
        code: 201,
        message: "Comentario creada exitosamente",
        data: content
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
                message: 'No se pudo actualizar el comentario.',
                data: null
            });
    }

    const comment = await getById(id);

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Comentario actualizada exitosamente.',
            data: comment
        });
};

exports.deleteByLogic = async function (req, res) {
	const { id } = req.params;

    const isDeleted = await deleteByLogic(id);

    if( isDeleted[0] < 1 ) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'No se pudo eliminar el comentario.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Comentario eliminada exitosamente.',
            data: null
        });
};
