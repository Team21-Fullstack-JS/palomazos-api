const { User } = require('../model/User');
const {
    signup,
    getAll,
    getById,
    getByEmail
} = require('../service/user');

exports.signup = async function (req, res) {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });

    const userDb = await signup(user.dataValues);

    return res
        .status(201)
        .json({
            error: false,
            code: 201,
            message: 'Usuario creado exitosamente',
            data: userDb
        });
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

exports.getById = async function (req, res) {
    const user = await getById(req.params.id);

    if (!user) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'Usuario no encontrado.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Usuario obtenido exitosamente.',
            data: user
        });
}

exports.getByEmail = async function (req, res) {
    const user = await getByEmail(req.params.email);

    if (!user) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'Usuario no encontrado.',
                data: null
            });
    }

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Usuario obtenido exitosamente.',
            data: user
        });
}