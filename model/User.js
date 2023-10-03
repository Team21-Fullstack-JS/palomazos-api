const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/Connection');

const {
    randomBytes,
    pbkdf2Sync
} = require('crypto');

const {
    sign
} = require('jsonwebtoken');

class User extends Model {

    //Metodo que crea un password encriptado
    createPassword = function (password) {
        this.salt = randomBytes(16).toString('hex');
        this.hash = pbkdf2Sync(password, this.salt, 2000, 254, 'sha512').toString('hex');
    };

    validatePassword = function (password) {
        const hash = pbkdf2Sync(password, this.salt, 2000, 254, 'sha512').toString('hex');
        return this.hash === hash;
    };

    //Metodo que genera el token
    generateJWT = function () {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + process.env.JWT_DAYS_EXPIRES);

        return sign({
            id: this.id,
            email: this.email,
            role: this.role,
            exp: parseInt(expirationDate.getTime() / 1000),
        }, process.env.JWT_SECRET);
    };

    //Metodo que devuelve los datos del usuario
    toAuthJSON = function () {
        return {
            id: this.id,
            email: this.email,
            role: this.role,
            token: this.generateJWT(),
        };
    };

    //Metodo que devuelve los datos del usuario
    publicData = function () {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            role: this.role,
        };
    }
}

exports.User = User;

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
        allowNull: false
    },
    lastName:  {
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING(1234),
    },
    salt: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    }
}, {
    sequelize,
    modelName: 'users',
    timestamps: false
});

//Metodo que crea un password encriptado
/*User.createPassword = function (password) {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 2000, 254, 'sha512').toString('hex');

    return { salt, hash };
};*/

//Metodo que valida el password
/*User.validatePassword = function (password, salt, hash) {
    const hashBd = pbkdf2Sync(password, salt, 2000, 254, 'sha512').toString('hex');

    return hash === hashBd;
};*/

//Metodo que genera el token
/*User.generateJWT = function (user) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + process.env.JWT_DAYS_EXPIRES);

    return sign({
        id: user.id,
        email: user.email,
        role: user.role,
        exp: parseInt(expirationDate.getTime() / 1000),
    }, process.env.JWT_SECRET);
};*/

//Metodo que devuelve los datos del usuario
/*User.toAuthJSON = function (user) {
    return {
        id: user.id,
        email: user.email,
        role: user.role,
        token: User.generateJWT(user),
    };
};*/

//Metodo que devuelve los datos del usuario
/*User.publicData = function (user) {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
    };*/
//};