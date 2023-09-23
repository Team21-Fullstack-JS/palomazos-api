const { User } = require('../model/User');
const {
    signup,
    getAll,
    getById,
    getByEmail,
    update,
    deleteLogicById
} = require('../service/user');

exports.signup = async function (req, res) {

    const { email } = req.body;
    const userExist = await getByEmail(email);

    if (userExist) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'El email ya se encuentra registrado.',
                data: null
            });
    }

    const user = User.build(req.body);
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

    if (users.length <= 0) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'No existen usuarios en la Base de datos.',
                data: null
            });
    }

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

exports.update = async function (req, res) {
    const { id } = req.params;
    const content = req.body;
    const user = await getById(id);

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

    const isUpdated = await update(id, { ...content });

    if( isUpdated[0] < 1 ) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'No se pudo actualizar el usuario.',
                data: null
            });
    }

    const userBd = await getById(id);

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Usuario actualizado exitosamente.',
            data: userBd
        });
}

exports.deleteLogicById = async function (req, res) {
    const { id } = req.params;
    const use = await getById(id);

    if (!use) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'Usuario no encontrado.',
                data: null
            });
    }

    const isDeleted = await deleteLogicById(id);

    if( isDeleted[0] < 1 ) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'No se pudo actualizar el usuario.',
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