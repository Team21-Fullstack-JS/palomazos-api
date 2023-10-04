const { User } = require("../../model/User");
const { obtenerTokenDelHeader } = require("../../utils/jwt");

exports.tokenErrorException = async function (req, res, next) {

    const token = obtenerTokenDelHeader(req); //Obtenemos el token del header
    const tokenDecoded = User.verifyJWT(token) //Verificamos el token

    if (tokenDecoded.error) {
        const message = tokenDecoded.err.name === 'TokenExpiredError' ? 'Su Token ha expirado. Inicie sesion nuevamente.' : 'Token inválido o no activo';

        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message,
                data: null,
            })
    }

    next();
};

exports.onlyAdminException = async function (req, res, next) {
    const { user } = req;

    if (user.role.toLowerCase() !== 'admin') {
        return res
            .status(403)
            .json({
                error: true,
                code: 403,
                message: 'No tiene permisos para realizar esta acción',
                data: null,
            });
    }

    next();
}