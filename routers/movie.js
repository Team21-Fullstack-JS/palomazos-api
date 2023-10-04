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

// Path inicial http://my-app.com/movies
router.get('/', getAllMovies);
router.get('/:id', getById);
router.get('/title/:title', getByTitle);
router.get('/year/:year', getByYear);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deletelogicById)

module.exports = router;