import Paciente from "../models/Paciente.js";

const obtenerPacientes = async (req, res) => {
    // Buscar todos los pacientes asociados al veterinario
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);

    res.json(pacientes)
}

const agregarPaciente = async (req, res) => {
    // Instanciar un nuevo paciente con los datos de la petición POST
    const paciente = new Paciente(req.body);

    try {
        // Asociar este paciente al veterinario que lo crea -> Ya tenemos la instancia gracias al JWT
        paciente.veterinario = req.veterinario._id;

        // Insertarlo en la base de datos
        const pacienteGuardado = await paciente.save()

        // Respuesta al API -> Creado correctamente
        res.json(paciente);
    } catch (error) {
        const errorBD = new Error('Error al crear el paciente');
        res.status(400).json({ msg: errorBD.message, error });
    }
}

const obtenerPaciente = async (req, res) => {
    const { id } = req.params; // ID de la URL

    // Consultar paciente de la BD y comprobar que exista
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        const error = new Error('No existe este paciente');
        return res.status(404).json({ msg: error.message });
    }

    // Vericiar que el que está consultando el paciente sea el veterinario que lo creó
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        const error = new Error('No tienes autorización para consultar este paciente');
        return res.status(401).json({ msg: error.message, idPac, idReq, comp });
    }

    res.status(200).json(paciente);
}

const actualizarPaciente = async (req, res) => {
    const { id } = req.params; // ID de la URL

    // Consultar paciente de la BD y comprobar que exista
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        const error = new Error('No existe este paciente');
        return res.status(404).json({ msg: error.message });
    }

    // Vericiar que el que está actualizando el paciente sea el veterinario que lo creó
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        const error = new Error('No tienes autorización para actualizar este paciente');
        return res.status(401).json({ msg: error.message, idPac, idReq, comp });
    }

    // Ya pasadas las comprobaciones, actualizar el paciente
    try {
        paciente.nombre = req.body.nombre || paciente.nombre;
        paciente.propietario = req.body.propietario || paciente.propietario;
        paciente.email = req.body.email || paciente.email;
        paciente.fecha = req.body.fecha || paciente.fecha;
        paciente.sintomas = req.body.sintomas || paciente.sintomas;

        const pacienteActualizado = await paciente.save();

        // Respuesta al API -> Actualizado correctamente
        res.json(pacienteActualizado);
    } catch (error) {
        const errorBD = new Error('Error al actualizar el paciente');
        return res.status(400).json({ msg: errorBD.message });
    }
}

const eliminarPaciente = async (req, res) => {
    const { id } = req.params; // ID de la URL

    // Consultar paciente de la BD y comprobar que exista
    const paciente = await Paciente.findById(id);

    if (!paciente) {
        const error = new Error('No existe este paciente');
        return res.status(404).json({ msg: error.message });
    }

    // Vericiar que el que está eliminando el paciente sea el veterinario que lo creó
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        const error = new Error('No tienes autorización para eliminar este paciente');
        return res.status(401).json({ msg: error.message, idPac, idReq, comp });
    }

    // Ya pasadas las comprobaciones, eliminar el paciente
    try {
        await paciente.deleteOne();

        // Respuesta al API -> Eliminado correctamente
        res.json({ msg: 'Paciente eliminado correctamente' });
    } catch (error) {
        const errorBD = new Error('Error al eliminar el paciente');
        return res.status(400).json({ msg: errorBD.message });
    }
}

export {
    obtenerPacientes,
    agregarPaciente,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}