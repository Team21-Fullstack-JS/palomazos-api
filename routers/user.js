const router = require('express').Router();

const {
    signup,
    getAll,
    getById,
    getByEmail
} = require('../controllers/user.js');

// Path inicial http://my-app.com/usuario
router.post('/', signup);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/email/:email', getByEmail);

module.exports = router;