import express from "express";
import dotenv from "dotenv/config";
import conectarBD from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";

// Creación del servidor con Express
const app = express();

// Body Parser
app.use(express.json());

// Conexión de la base de datos de MongoDB
conectarBD();

// Routing
app.use('/api/veterinarios/', veterinarioRoutes);

// Arrancar el servidor
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});