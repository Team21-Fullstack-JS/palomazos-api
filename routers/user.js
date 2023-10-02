const router = require('express').Router();

const {
    signup,
    getAll,
    getById,
    getByEmail,
    update,
    deleteLogicById
} = require('../controllers/user.js');

// Path inicial http://my-app.com/users
router.post('/', signup); 
router.get('/', getAll);
router.get('/:id', getById);
router.get('/email/:email', getByEmail);
router.put('/:id', update);
router.delete('/:id', deleteLogicById);

module.exports = router;