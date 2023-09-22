const { User } = require('../model/User');

exports.signup = function (user) {
    return User.create(user);
}

exports.getAll = function () {
    return User.findAll();
}

exports.getById = function (id) {
    return User.findOne({
        where: {
            id: id
        }
    });
}

exports.getByEmail = function (email) {
    return User.findOne({
        where: {
            email: email
        }
    });
}