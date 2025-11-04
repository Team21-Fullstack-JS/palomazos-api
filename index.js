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
const isProduction = process.env.NODE_ENV === 'production';

//Inicializar la base de datos
initDatabase();

// 🔧 CORS solo en desarrollo (porque en producción lo maneja Nginx)
if (!isProduction) {
    console.log('🧪 Modo desarrollo: habilitando CORS desde Express');
    app.use(cors({
        origin: ['http://localhost:5173', 'https://team21-fullstack-js.github.io', 'https://hiram-oci-mty.duckdns.org'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
} else {
    console.log('🚀 Modo producción: CORS manejado por Nginx');
}

//Middlewares
app.use(express.json());//Parsea el body
app.use(express.urlencoded({ extended: false})); //Parsea URL codificados del body

app.use('/palomazos-api/v1/', require('./routers/index.js'));
app.use('/palomazos-api/v1/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));//Endpoint para la documentación

//Importamos middlewares para manejar de errores
const { handleErrorJoi } = require('./middlewares/validation-error.js'); //Errores de validación por Joi
const { unknownError } = require('./middlewares/unknown-error.js'); //Errores inesperados o desconocidos

//Uso de middlewares para manejar errores
app.use( handleErrorJoi );
app.use( unknownError );

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});