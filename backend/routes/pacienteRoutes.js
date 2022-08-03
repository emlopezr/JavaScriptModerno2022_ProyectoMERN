import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import { obtenerPacientes, agregarPaciente, obtenerPaciente, actualizarPaciente, eliminarPaciente } from "../controllers/pacienteController.js";

const router = express.Router();

// Rutas públicas

// Rutas privadas -> Hay que estar logueado
router.route('/')
    .get(checkAuth, obtenerPacientes)
    .post(checkAuth, agregarPaciente);

router.route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router;