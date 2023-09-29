const router = require('express').Router();

const {
    signup,
    getAll,
    getById,
    getByEmail,
    update,
    deleteLogicById,
} = require('../controllers/user.js');

// Middleware para validar los datos de entrada
const validator = require('../middlewares/validator.js');

// Importamos los esquemas de validación
const {
    createUserSchema
} = require('../validations/user.js');

// Importamos los diferentes manejadores de errores para los usuarios
const {
    userAlreadyExistsException,
    usersNotFoundException,
    userNotFoundException,
    emailUserNotFoundException
} = require('../middlewares/exceptions/user-exceptions.js');

/** Path inicial http://my-app.com/users
 * Aqui definimos las rutas para el recurso users
 */
router.post(
    '/',
    validator.body(createUserSchema),
    userAlreadyExistsException,
    signup
);

router.get('/', usersNotFoundException, getAll);
router.get('/:id', userNotFoundException, getById);
router.get('/email/:email', emailUserNotFoundException, getByEmail);
router.put('/:id', userNotFoundException, update);
router.delete('/:id', userNotFoundException, deleteLogicById);

module.exports = router;