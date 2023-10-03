const { User } = require('../model/User');

// Los servicios que estan encargados de interactuar con la base de datos
const {
    signup,
    getAll,
    getById,
    getByEmail,
    update,
    deleteLogicById
} = require('../service/user');

exports.signup = async function (req, res) {

    const { firstName, lastName, email, password, role } = req.body;
    const user = User.build({ firstName, lastName, email, role });

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

exports.login = async function (req, res) {
       const { email, password } = req.body;

        const userDB = await getByEmail(email);

        if (!userDB) {
            return res
                .status(404)
                .json({
                    error: true,
                    code: 404,
                    message: 'Verificar su Email! o Password.',
                    data: null
                });
        }

        const isPasswordCorrect = userDB.validatePassword(password);

        if (!isPasswordCorrect) {
            return res
                .status(404)
                .json({
                    error: true,
                    code: 404,
                    message: 'Verificar su Email o Password!.',
                    data: null
                });
        }

        return res
            .status(200)
            .json({
                error: false,
                code: 200,
                message: 'Usuario logueado exitosamente.',
                data: userDB.toAuthJSON()
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

    return res
        .status(200)
        .json({
            error: false,
            code: 200,
            message: 'Usuario obtenido exitosamente.',
            data: user.publicData()
        });
}

exports.getByEmail = async function (req, res) {
    const { email } = req.query;

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

exports.update = async function (req, res) {
    const { id } = req.params;
    const content = req.body;

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
            data: userBd.publicData()
        });
}

exports.deleteLogicById = async function (req, res) {
    const { id } = req.params;

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