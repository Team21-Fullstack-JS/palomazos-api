const router = require('express').Router();

const {
    create,
    getAllMovies,
    getById,
    getByTitle,
    getByYear,
    update,
    deletelogicById,
    createMovieReview
} = require('../controllers/movie.js');

// Middleware para validar los datos de entrada
const validator = require('../middlewares/validator.js');

// Importamos los esquemas de validación
const {
	createMovieSchema,
	updateMovieSchema,
	paramsIdSchema,
    createMovieReviewSchema
} = require("../validations/movie.js");


// Path inicial http://my-app.com/movies
router.get(
    '/', 
    getAllMovies
);

router.get(
    '/:id', 
    validator.params(paramsIdSchema),
    getById
);

router.get(
    '/title/:title',
    getByTitle
);

router.get(
    '/year/:year', 
    getByYear
);

router.post(
    '/', 
    validator.body(createMovieSchema), 
    create
);

router.put(
    '/:id',
    validator.params(paramsIdSchema),
	validator.body(updateMovieSchema),
    update
);

router.delete(
    '/:id', 
    validator.params(paramsIdSchema),
    deletelogicById
);

router.post(
    '/:id/reviews',
    validator.params(paramsIdSchema),
    validator.body(createMovieReviewSchema),
    createMovieReview
);

module.exports = router;