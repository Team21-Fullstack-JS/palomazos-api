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

exports.paramsSchema = Joi.object({
	id: Joi.number().required(),
});