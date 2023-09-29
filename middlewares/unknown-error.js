exports.unknownError = function (err, request, response, next) {
    response.status(500).json({
        error: true,
        code: 500,
        message: 'Hubo un error inesperado en el servidor backend.',
        data: err.toString()
    });
};