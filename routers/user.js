const router = require('express').Router();

const {
    signup,
    login,
    getAll,
    getUserBy,
    update,
    deleteLogicById,
    changePassword,
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

router.post( //Registro de usuario nuevo
    '/',
    validator.body(createUserSchema),
    userAlreadyExistsException,
    signup
);

router.get('/', //Retorna una lista con todos los usuarios --Solo Admins
    tokenErrorException,
    required,
    onlyAdminException,
    usersNotFoundException,
    getAll,
);

router.put( //Usuario autenticado puede actualizar sus datos
    '/',
    validator.body(updateUserSchema),
    tokenErrorException,
    required,
    userNotFoundException,
    update
);

router.delete( //Usuario autenticado puede eliminar su cuenta --Logicamente
    '/',
    tokenErrorException,
    required,
    userNotFoundException,
    deleteLogicById
);

router.get('/me', //Usuario autenticado puede ver sus datos
    tokenErrorException,
    required,
    userNotFoundException,
    getUserBy,
);

router.post(
    '/auth',
    validator.body(loginUserSchema),
    userDeletedLogicException,
    login
);

router.put(
    '/auth',
    validator.body(changePasswordSchema),
    tokenErrorException,
    required,
    userNotFoundException,
    changePassword
);

module.exports = router;