require('dotenv').config();
const express = require('express');
const cors = require('cors'); //Seguridad en peticiones HTTP

//Documentacion de swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { initDatabase } = require('./database/db');

//Registro de passport
require('./middlewares/passport');

const app = express();

//Inicializar la base de datos
initDatabase();

//Middlewares
app.use(express.json());//Parsea el body
app.use(express.urlencoded({ extended: false})); //Parsea URL codificados del body
app.use(cors()); //Seguridad en peticiones

app.use('/api/v1/', require('./routers/index.js'));
app.use('/api/v1/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));//Endpoint para la documentación

//Importamos middlewares para manejar de errores
const { handleErrorJoi } = require('./middlewares/validation-error.js'); //Errores de validación por Joi
const { unknownError } = require('./middlewares/unknown-error.js'); //Errores inesperados o desconocidos

//Uso de middlewares para manejar errores
app.use( handleErrorJoi );
app.use( unknownError );

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});