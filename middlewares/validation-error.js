exports.handleErrorJoi = function (err, req, res, next) {
    if (err && err.error && err.error.isJoi) {
        const messages = err.error.details.map((detail) => detail.message);
        // we had a joi error, let's return a custom 400 json response
        res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: [...messages],
                data: null
            });
    } else {
        // pass on to another error handler
        next(err);
    }
}