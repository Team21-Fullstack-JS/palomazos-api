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


// Passport para la autenticación y autorización de usuarios
const { required } = require('./auth')

// Manejo de errores por token o nivel de acceso
const {
    tokenErrorException
} = require('../middlewares/exceptions/auth-exceptions.js');

// Path http://my-app.com/users
router.use('/users', require('./user.js'));
router.use('/movies', required, tokenErrorException, require('./movie.js'));
router.use('/reviews', required, require('./review.js'));

module.exports = router;