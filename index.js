require('dotenv').config();
const express = require('express');
const app = express();
const { initDatabase } = require('./database/db');

//Inicializar la base de datos
initDatabase();

//Middlewares
app.use(express.json());

app.use('/api/v1/', require('./routers/index.js'));

//Manejador de errores
const { handleErrorJoi } = require('./middlewares/validation-error.js'); //Errores de validación por Joi
const { unknownError } = require('./middlewares/unknown-error.js'); //Errores inesperados o desconocidos

app.use( handleErrorJoi );
app.use( unknownError );

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});