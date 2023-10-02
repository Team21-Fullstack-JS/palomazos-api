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
    createUserSchema,
    updateUserSchema,
    idUserSchema,
    emailUserSchema
} = require('../validations/user.js');

// Importamos los diferentes manejadores de errores para los usuarios
const {
    userAlreadyExistsException,
    usersNotFoundException,
    userNotFoundException,
    emailUserNotFoundException
} = require('../middlewares/exceptions/user-exceptions.js');

/** Path inicial http://my-app.com/users
 * Aqui definimos las rutas para el recurso /users
 */
router.get(
    '/',
    usersNotFoundException,
    getAll
);

router.get(
    '/findby',
    validator.query(emailUserSchema),
    emailUserNotFoundException,
    getByEmail
);

router.get(
    '/:id',
    validator.params(idUserSchema),
    userNotFoundException,
    getById
);

router.delete(
    '/:id',
    validator.params(idUserSchema),
    userNotFoundException,
    deleteLogicById
);

router.post(
    '/',
    validator.body(createUserSchema),
    userAlreadyExistsException,
    signup
);

router.put(
    '/:id',
    validator.params(idUserSchema),
    validator.body(updateUserSchema),
    userNotFoundException,
    update
);

module.exports = router;