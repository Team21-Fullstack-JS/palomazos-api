const Joi = require('joi');

exports.createMovieSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().min(4).optional(),
})

exports.updateMovieSchema = Joi.object({
    title: Joi.string().optional(),
    year: Joi.number().min(4).optional(),
})

exports.paramsSchema = Joi.object({
	id: Joi.number().required(),
});