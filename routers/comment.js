const router = require('express').Router();

// Middleware para validar los datos de entrada
const validator = require('../middlewares/validator.js');

const {
    newComment,
    getReviewComment,
    update,
    deleteByLogic,
} = require('../controllers/comment.js');


// Importamos los esquemas de validación
const {
	createCommentSchema,
	updateCommentSchema,
	paramsSchema,
} = require("../validations/comment.js");


// Path inicial http://my-app.com/movies/:id/reviews/:id/comment
router.get(
    '/', 
    getReviewComment
);

router.post(
    '/', 
    validator.body(createCommentSchema), 
    newComment
);

router.put(
    '/:id',
    validator.params(paramsSchema),
	  validator.body(updateCommentSchema),
    update
);

router.delete(
    '/:id', 
    validator.params(paramsSchema), 
    deleteByLogic
);

module.exports = router;
