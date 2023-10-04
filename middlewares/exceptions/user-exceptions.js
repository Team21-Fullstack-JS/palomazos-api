const { getByEmail, getAll, getById} = require("../../service/user");

exports.userAlreadyExistsException = async function (req, res, next) {
    const { email } = req.body;
    const userExist = await getByEmail(email);

    if (userExist) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'Ya existe un usuario registrado con ese email.',
                data: null,
            });
    }

    next();
};

exports.usersNotFoundException = async function (req, res, next) {
    const users = await getAll();

    if (!users[0] || users.length <= 0) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'No existen usuarios en la Base de datos.',
                data: null
            });
    }

    next();
}

exports.userNotFoundException = async function (req, res, next) {
    const user = await getById(req.user.id);

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

    next();
}

exports.emailUserNotFoundException = async function (req, res, next) {
    const user = await getByEmail(req.user.email);

    if (!user) {
        return res
            .status(404)
            .json({
                error: true,
                code: 404,
                message: 'No se encontro un usuario con ese email.',
                data: null
            });
    }

    next();
}