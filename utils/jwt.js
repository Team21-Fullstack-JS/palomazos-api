// Obtenemos el jwt del header de la petición y verificamos su existencia.
exports.obtenerTokenDelHeader = function(req) {

    const autorizacion = req.headers.authorization; //Si el encabezado cuenta con el apartado utils

    //Si existe el encabezado
    let token;
    let bearer;

    if(autorizacion) {
        token = autorizacion.split(' ')[0]; //Si viene como "Token"
        bearer = autorizacion.split(' ')[0]; //Si viene como "Bearer"
    }

    //Si existe el token
    if(autorizacion && token === 'Token' || autorizacion && bearer === 'Bearer' ){
        return autorizacion.split(' ')[1]; //Retorna el token
    }

    //Si no existe
    return null; //Se retorna valor nulo
}