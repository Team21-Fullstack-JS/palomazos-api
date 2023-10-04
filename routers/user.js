const router = require('express').Router();

const {
    signup,
    login,
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
    //idUserSchema,
    //emailUserSchema,
    loginUserSchema
} = require('../validations/user.js');

// Importamos los diferentes manejadores de errores para los usuarios
const {
    userAlreadyExistsException,
    usersNotFoundException,
    userNotFoundException,
    emailUserNotFoundException
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
    //validator.query(emailUserSchema),
    tokenErrorException,
    required,
    emailUserNotFoundException,
    getByEmail
);

router.get('/',
    //validator.params(idUserSchema),
    tokenErrorException,
    required,
    userNotFoundException,
    getById,
);

router.put(
    '/',
    //validator.params(idUserSchema),
    validator.body(updateUserSchema),
    tokenErrorException,
    required,
    userNotFoundException,
    update
);

router.delete(
    '/',
    //validator.params(idUserSchema),
    tokenErrorException,
    required,
    userNotFoundException,
    deleteLogicById
);

module.exports = router;