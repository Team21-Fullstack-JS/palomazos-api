const Joi = require('joi');

exports.createUserSchema = Joi.object({
    firstName:
        Joi.string()
            .empty()
            .min(2)
            .required()
            .messages({
                'string.base': 'El nombre debe ser una cadena de texto',
                'string.empty': 'El nombre no puede estar vacío',
                'string.min': 'La longitud mínima del nombre es de {#limit} caracteres',
                'any.required': 'El nombre es un campo requerido'
            }),
    lastName:
        Joi.string()
            .empty()
            .required()
            .min(2)
            .messages({
                'string.base': 'El apellido debe ser una cadena de texto',
                'string.empty': 'El apellido no puede estar vacío',
                'string.min': 'La longitud mínima del apellido es de {#limit} caracteres',
                'any.required': 'El apellido es un campo requerido'
            }),
    email:
        Joi.string()
            .empty()
            .required()
            .email()
            .messages(
                {
                    'string.base': 'El email debe ser una cadena de texto',
                    'string.empty': 'El email no puede estar vacío',
                    'string.email': 'El email debe ser un email válido',
                    'any.required': 'El email es un campo requerido'
                }
        ),
    password:
        Joi.string()
            .empty()
            .required()
            .min(8)
            .max(30)
            .messages({
                'string.base': 'La contraseña debe ser una cadena de texto',
                'string.empty': 'La contraseña no puede estar vacía',
                'string.min': 'La longitud mínima de la contraseña es de {#limit} caracteres',
                'string.max': 'La longitud máxima de la contraseña es de {#limit} caracteres',
                'any.required': 'La contraseña es un campo requerido'
            })
});