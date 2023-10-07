const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/Connection');

const {
    randomBytes,
    pbkdf2Sync
} = require('crypto');

const {
    sign,
    verify
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

    static verifyJWT = function (token) {
        return verify(
            token,
            process.env.JWT_SECRET,
            (err, decode) => decode !== undefined ? {error: false, decode } : {error: true, decode: null, err}
        );
    }

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
            //isActive: this.isActive
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