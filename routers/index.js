const router = require('express').Router();

// Path inicial http://my-app.com/
router.get('/', (req, res) => {
    res.send('Bienvenido a la API de Palomazos! sobre peliculas');
});

// Path http://my-app.com/usuario
router.use('/usuario', require('./usuario.js'));

module.exports = router;