import express from "express";
import dotenv from "dotenv/config";
import conectarBD from "./config/db.js";

// Creación del servidor con Express
const app = express();

// Conexión de la base de datos de MongoDB
conectarBD();

app.use('/', (req, res) => {
    res.send('Hola mundo!');
});

// Arrancar el servidor
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});