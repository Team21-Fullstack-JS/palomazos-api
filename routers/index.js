const router = require('express').Router();

// Path inicial http://my-app.com/
router.get('/', (req, res) => {
    res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Bienvenido a su API de peliculas: Palomazos!'
        });
});

// Path http://my-app.com/users
router.use('/users', require('./user.js'));
router.use('/movies', require('./movie.js'));

module.exports = router;