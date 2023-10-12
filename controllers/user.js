const { User } = require('../model/User');
const passport = require('passport');

// Los servicios que estan encargados de interactuar con la base de datos
const {
    signup,
    getAll,
    getById,
    getByEmail,
    update,
    deleteLogicById
} = require('../service/user');
const {Review} = require("../model/Review");

exports.signup = async function (req, res) {

    const { firstName, lastName, email, password, role } = req.body;

    /**Solo los ADMINS pueden crear usuarios ADMINS*/
    const isUser = req.user; //Si existe un usuario logueado

    let newRole = role;
    if( isUser && req.user.role.toLowerCase() !== 'admin' && role.toLowerCase() === 'admin' ) {
        newRole = 'USER';
    }
    /***********************************************/

    const user = User.build({ firstName, lastName, email, newRole });

    user.createPassword(password);
    const userDb = await signup(user.dataValues);

    return res
        .status(201)
        .json({
            error: false,
            code: 201,
            message: 'Usuario creado exitosamente',
            data: userDb.publicData()
        });
}

exports.login = async function (req, res, next) {

    //Si existen email y password, autenticamos con passport
    passport.authenticate('local',
        { session: false},
        function(err, user, info){
            //Si hubo error
            if(err){
                return next(err); //Retornamos el error
            }

            //Si no hubo error
            if(user){ // Existe el usuario
                return res.status(200).json({
                    error: null,
                    code: 200,
                    message: 'Login exitoso!',
                    data: user.toAuthJSON(),
                });
            } else { //Si no existe el usuario
                return res.status(422).json({
                    error: true,
                    code: 422,
                    message: info.message,
                    data: null
                });
            }
        })(req, res, next);
}

exports.getAll = async function (req, res) {
    const users = await getAll();

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Lista de usuarios obtenida exitosamente.',
            data: users
        });
}

exports.getByEmail = async function (req, res) {
    const { email } = req.user;
    const user = await getByEmail(email);

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Usuario obtenido exitosamente por su email.',
            data: user.publicData()
        });
}

exports.getById = async function (req, res) {
    const { id } = req.user;
    let isReviews = req.query.reviews;
    isReviews = isReviews === 'true';
    const data = await getById(id, isReviews);

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Usuario y todos sus reviews obtenidos exitosamente.',
            data: data
        });
}

exports.update = async function (req, res) {
    const { id } = req.user;
    const content = req.body;

    await update(id, { ...content });

    const userBd = await getById(id);

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Usuario actualizado exitosamente.',
            data: userBd.publicData()
        });
}

exports.deleteLogicById = async function (req, res) {
    const { id } = req.user;

    const isDeleted = await deleteLogicById(id);

    if( isDeleted[0] < 1 ) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'No se pudo eliminar el usuario.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Usuario eliminado exitosamente.',
            data: null
        });
}

exports.changePassword = async function (req, res) {
    const { id } = req.user;
    const { password, newPassword } = req.body;

    const user = await getById(id);

    const isPasswordValid = user.validatePassword(password);

    if( !isPasswordValid ) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'La contraseña actual no es correcta.',
                data: null
            });
    }

    user.createPassword(newPassword);

    const hash = user.dataValues.hash;
    const salt = user.dataValues.salt;

    await update(id, { hash, salt });

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Contraseña actualizada exitosamente.',
            data: null
        });
}