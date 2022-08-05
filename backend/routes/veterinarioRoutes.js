import express from "express";
import { registrar, perfil, confirmar, autenticar, restablecerPassword, comprobarTokenPass, nuevoPassword, actualizarPerfil, actualizarPassword } from "../controllers/veterinarioController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.post('/', registrar);
router.get('/confirmar/:token', confirmar); // Confirmación por medio del Token
router.post('/login', autenticar);
router.post('/restablecerpassword', restablecerPassword); // Si el usuario olvidó la contraseña
router.route('/restablecerpassword/:token') // Usar el token del email para restablecer la contraseña
    .get(comprobarTokenPass)
    .post(nuevoPassword)

// Rutas privadas -> Hay que estar logueado
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put('/actualizarpassword', checkAuth, actualizarPassword);

export default router;