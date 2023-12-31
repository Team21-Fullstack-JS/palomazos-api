const { getByEmail, getAll, getUserBy} = require("../../service/user");

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

    if (users.length <= 0 || !users[0]) {
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
    let isEmail = req.query.email;
    isEmail = isEmail === 'true';
    const searchBy = isEmail ? req.user.email : req.user.id;

    const user = await getUserBy(isEmail, searchBy);

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

exports.userDeletedLogicException = async function (req, res, next) {
    const user = await getByEmail(req.body.email);

    if (!user || !user.isActive) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: 'Usuario no existe o dado de baja.',
                data: null
            });
    }

    next();
}