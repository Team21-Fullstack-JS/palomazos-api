const Joi = require('joi');

exports.createMovieSchema = Joi.object({
    id: Joi.number().min(3).required(),
    title: Joi.string().min(3).required(),
    overview: Joi.string().min(3).required(),
    year: Joi.string().min(10).required(),
    poster_path: Joi.string().required(),
    backdrop_path: Joi.string().required(),
})

exports.updateMovieSchema = Joi.object({
    title: Joi.string().optional(),
    overview: Joi.string().required(),
    poster_path: Joi.string().required(),
    backdrop_path: Joi.string().required(),
})

exports.paramsIdSchema = Joi.object({
	id: Joi.number().required().messages({
        'number.base': 'El id debe ser un número',
        'number.empty': 'El id no puede estar vacío',
        'any.required': 'El id es un campo requerido'
    })
});

exports.createMovieReviewSchema = Joi.object({
    rate: Joi.number().min(1).max(5).required().messages({
        'number.base': 'El rate debe ser un número',
        'number.empty': 'El rate no puede estar vacío',
        'number.min': 'El rate debe ser mayor o igual a {#limit}',
        'number.max': 'El rate debe ser menor o igual a {#limit}',
        'any.required': 'El rate es un campo requerido'
    })
    ,isCheck: Joi.boolean().required().messages({
        'boolean.base': 'El isCheck debe ser un booleano',
        'boolean.empty': 'El isCheck no puede estar vacío',
        'any.required': 'El isCheck es un campo requerido'
    }),
    comment: Joi.object({
        content: Joi.string().min(5).optional().messages({
            'string.base': 'El comentario debe ser una cadena de texto',
            'string.empty': 'El comentario no puede estar vacío',
            'string.min': 'El comentario debe tener una longitud mínima de {#limit} caracteres',
        })
    })
});