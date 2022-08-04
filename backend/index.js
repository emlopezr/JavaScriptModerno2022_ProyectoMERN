import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import conectarBD from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

// Creación del servidor con Express
const app = express();

// Body Parser
app.use(express.json());

// Conexión de la base de datos de MongoDB
conectarBD();

// CORS
const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));

// Routing
app.use('/api/veterinarios/', veterinarioRoutes);
app.use('/api/pacientes/', pacienteRoutes);

// Arrancar el servidor
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});