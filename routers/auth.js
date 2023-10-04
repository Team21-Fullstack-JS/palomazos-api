const { expressjwt } = require("express-jwt");
const { obtenerTokenDelHeader } = require('../utils/jwt');
const {User} = require("../model/User");

const auth = {
    required: expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
        requestProperty: 'user',
        getToken: obtenerTokenDelHeader
    }),
    optional: expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
        requestProperty: 'user',
        getToken: obtenerTokenDelHeader,
        credentialsRequired: false,
    })
};

module.exports = auth;