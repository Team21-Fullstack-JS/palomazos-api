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

// Passport para la autenticación y autorización de usuarios
const { required } = require('./auth')

// Manejo de errores por token o nivel de acceso
const {
    tokenErrorException
} = require('../middlewares/exceptions/auth-exceptions.js');

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
    tokenErrorException,
    required,
    getById
);

router.get(
    '/title/:title',
    tokenErrorException,
    required,
    getByTitle
);

router.get(
    '/year/:year',
    tokenErrorException,
    required,
    getByYear
);

router.post(
    '/',
    validator.body(createMovieSchema),
    tokenErrorException,
    required,
    create
);

router.put(
    '/:id',
    validator.params(paramsIdSchema),
	validator.body(updateMovieSchema),
    tokenErrorException,
    required,
    update
);

router.delete(
    '/:id', 
    validator.params(paramsIdSchema),
    tokenErrorException,
    required,
    deletelogicById
);

router.post(
    '/:id/reviews',
    validator.params(paramsIdSchema),
    validator.body(createMovieReviewSchema),
    tokenErrorException,
    required,
    createMovieReview
);

module.exports = router;