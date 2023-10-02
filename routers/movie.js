const router = require('express').Router();

const {
    create,
    getAllMovies,
    getById,
    getByTitle,
    getByDirector,
    getByYear,
} = require('../controllers/movie.js');

// Path inicial http://my-app.com/movies
router.get('/', getAllMovies);
router.get('/:id', getById);
router.get('/title/:title', getByTitle);
router.get('/director/:director', getByDirector);
router.get('/year/:year', getByYear);
router.post('/', create);

module.exports = router;