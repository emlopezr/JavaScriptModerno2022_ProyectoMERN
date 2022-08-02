import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
    // Prevenir emails duplicados
    const { email } = req.body; // Datos de la petición POST
    const existeUsuario = await Veterinario.findOne({ email }); // Buscar si existe ese email en la BD

    if (existeUsuario) {
        const error = new Error('Error al crear el veterinario. Email ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Guardar un nuevo veterinario en la BD
        const veterinario = new Veterinario(req.body); // Datos de la petición POST
        const veterinarioGuardado = await veterinario.save();

        // Respuesta al API -> Creado correctamente
        res.json({ msg: 'Veterinario creado correctamente' });
    } catch (error) {
        // Respuesta al API -> Error
        res.json({ msg: 'Error al crear el veterinario' });
    }
}

const perfil = (req, res) => {
    res.json({ url: 'Perfil del veterinario' });
}

const confirmar = async (req, res) => {
    // Leer el comodín de la URL
    const { token } = req.params;

    // Buscar el usuario a confirmar en la BD
    const usuarioConfirmar = await Veterinario.findOne({ token });

    if (!usuarioConfirmar) {
        const error = new Error('Error. Token no válido');
        return res.status(404).json({ msg: error.message });
    }

    try {
        // Expirar el Token, confirmar el usuario y actualizarlo en la BD
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        // Respuesta al API -> Cuenta confirmada
        res.json({ msg: 'Veterinario confirmado correctamente' });
    } catch (error) {
        // Respuesta al API -> Error
        res.json({ msg: 'Error al confirmar el veterinario' });
    }
}

export {
    registrar,
    perfil,
    confirmar
}