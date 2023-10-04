const { User } = require('../model/User');
const {where} = require("sequelize");

exports.signup = function (user) {
    return User.create(user);
}

exports.getAll = async function () {
    const users = await User.findAll(
        {
            where: { isActive: true }
        }
    );

    return users.map( (user) => user.publicData());
}

exports.getById = function (id) {
    return User.findOne({
        where: {
            id: id,
            isActive: true
        }
    });
}

exports.getByEmail = function (email) {
    return User.findOne({
        where: {
            email: email,
            isActive: true
        }
    });
};

exports.update = function (id, user) {
    return User.update(user, {
        where: {
            id: id,
            isActive: true
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