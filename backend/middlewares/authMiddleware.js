import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    const { authorization } = req.headers; // Conseguir el JWT

    if (authorization && authorization.startsWith('Bearer')) { // Bearer Token es un estándar
        try {
            const token = authorization.split(' ')[1]; // Quitar el "Bearer"
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Obtener el usuario asociado y crear una sesión dentro de Express
            req.veterinario = await Veterinario.findById(decoded.id).select('-password -token -confirmado'); // No obtener esa información

            return next();
        } catch (error) {
            // Token no válido
            const errorToken = new Error('Token no válido');
            res.status(403).json({ msg: errorToken.message });
        }
    }

    // No hay token o no es válido
    const error = new Error('No hay autorización para ver la página');
    res.status(403).json({ msg: error.message });

    next();
}

export default checkAuth;