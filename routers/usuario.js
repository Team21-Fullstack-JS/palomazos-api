const router = require('express').Router();

const { bienvenidaUsuarios } = require('../controllers/usuario.js');

// Path inicial http://my-app.com/usuario
router.get('/', bienvenidaUsuarios);

module.exports = router;