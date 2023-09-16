require('dotenv').config();
const express = require('express');
const app = express();

app.use('/', require('./routers/index.js'));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});