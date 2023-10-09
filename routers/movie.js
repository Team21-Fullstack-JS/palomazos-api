const router = require('express').Router();

const {
    create,
    getAllMovies,
    getById,
    getByTitle,
    getByYear,
    update,
    deletelogicById,
} = require('../controllers/movie.js');

// Middleware para validar los datos de entrada
const validator = require('../middlewares/validator.js');

// Importamos los esquemas de validación
const {
	createMovieSchema,
	updateMovieSchema,
	paramsSchema,
} = require("../validations/movie.js");


// Path inicial http://my-app.com/movies
router.get(
    '/', 
    getAllMovies
);

router.get(
    '/:id', 
    validator.params(paramsSchema),
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
    validator.params(paramsSchema),
	validator.body(updateMovieSchema),
    update
);

router.delete(
    '/:id', 
    validator.params(paramsSchema), 
    deletelogicById
);

module.exports = router;