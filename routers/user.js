const router = require('express').Router();

const {
    signup,
    login,
    getAll,
    getById,
    getByEmail,
    update,
    deleteLogicById,
    changePassword
} = require('../controllers/user.js');

// Middleware para validar los datos de entrada
const validator = require('../middlewares/validator.js');

// Importamos los esquemas de validación
const {
    createUserSchema,
    updateUserSchema,
    loginUserSchema,
    changePasswordSchema
} = require('../validations/user.js');

// Importamos los diferentes manejadores de errores para los usuarios
const {
    userAlreadyExistsException,
    usersNotFoundException,
    userNotFoundException,
    emailUserNotFoundException,
    userDeletedLogicException
} = require('../middlewares/exceptions/user-exceptions.js');

// Manejo de errores por token o nivel de acceso
const {
    tokenErrorException,
    onlyAdminException
} = require('../middlewares/exceptions/auth-exceptions.js');

// Passport para la autenticación y autorización de usuarios
const { required } = require('./auth')

/** Path inicial http://my-app.com/users
 * Aqui definimos las rutas para el recurso /users
 */

router.post(
    '/signup',
    validator.body(createUserSchema),
    userAlreadyExistsException,
    signup
);

router.post(
    '/login',
    validator.body(loginUserSchema),
    userDeletedLogicException,
    login
);

router.get('/all',
    tokenErrorException,
    required,
    onlyAdminException,
    usersNotFoundException,
    getAll,
);

router.get('/findbyemail',
    tokenErrorException,
    required,
    emailUserNotFoundException,
    getByEmail
);

router.get('/',
    tokenErrorException,
    required,
    userNotFoundException,
    getById,
);

router.put(
    '/',
    validator.body(updateUserSchema),
    tokenErrorException,
    required,
    userNotFoundException,
    update
);

router.delete(
    '/',
    tokenErrorException,
    required,
    userNotFoundException,
    deleteLogicById
);

router.put(
    '/change-password',
    validator.body(changePasswordSchema),
    tokenErrorException,
    required,
    userNotFoundException,
    changePassword
);

module.exports = router;