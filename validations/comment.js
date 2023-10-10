const Joi = require('joi');

exports.createCommentSchema = Joi.object({
    id: Joi.number().min(1).required(),
    content: Joi.string().required().messages({
      'string.empty': 'El comentario no puede ser una cadena vacia'
    }),
})

exports.updateCommentSchema = Joi.object({
    content: Joi.string().required().messages({
      'string.empty': 'El comentario no puede ser una cadena vacia'
    }),

})

exports.paramsSchema = Joi.object({
	id: Joi.number().required(),
});
