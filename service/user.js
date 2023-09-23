const { User } = require('../model/User');

exports.signup = function (user) {
    return User.create(user);
}

exports.getAll = function () {
    return User.findAll();
}

exports.getById = function (id) {
    return User.findByPk(id);
}

exports.getByEmail = function (email) {
    return User.findOne({
        where: {
            email: email
        }
    });
};

exports.update = function (id, user) {
    return User.update(user, {
        where: {
            id: id
        }
    });
};

exports.deleteLogicById = function (id) {
    return User.update({ isActive: false }, {
        where: {
            id: id
        }
    });
}