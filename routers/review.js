const router = require('express').Router();

const {getById, getAllReviewsFromMovie, getAllReviewsFromUser, getReviewFromComment, create, update, deleteReviewById} = require('../controllers/review');

router.get('/id_movie/:id_movie', getAllReviewsFromMovie);
router.get('/:id', getById);
router.get('/id_user/:id_user', getAllReviewsFromUser);
router.get('/id_comment/:id_comment', getReviewFromComment);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteReviewById)

module.exports = router;