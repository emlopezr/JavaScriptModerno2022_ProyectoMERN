import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarID.js";

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

const autenticar = async (req, res) => {
    const { email, password } = req.body; // Datos de la petición POST

    // Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({ email });

    if (!usuario) {
        const error = new Error('El usuario con este email no existe');
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar que la cuenta ya esté confirmada
    if (!usuario.confirmado) {
        const error = new Error('El usuario aún ha confirmado su cuenta');
        return res.status(403).json({ msg: error.message });
    }

    // Comprobar la contraseña
    if (await usuario.comprobarPassword(password)) {
        // Autenticar
        return res.status(200).json({ token: generarJWT(usuario.id) });
    } else {
        const error = new Error('Contraseña incorrecta');
        return res.status(403).json({ msg: error.message });
    }
}


const perfil = (req, res) => {
    // Ya tenemos la sesión del veterinario
    const { veterinario } = req;

    res.json({ perfil: veterinario });
}

const restablecerPassword = async (req, res) => {
    const { email } = req.body; // Datos de la petición POST

    // Buscar si existe ese email en la BD
    const veterinario = await Veterinario.findOne({ email });

    if (!veterinario) {
        const error = new Error('El veterinario con este email no existe');
        return res.status(400).json({ msg: error.message });
    }

    // El veterinario si existe, generar el token
    try {
        // Cambiar el valor y guardarlo en la BD
        veterinario.token = generarId();
        await veterinario.save()

        // Mostrar respuesta al usuario
        res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    } catch (error) {
        res.json({ msg: 'Error al generar el Token' });
    }
}

const comprobarTokenPass = async (req, res) => {
    // Leer el comodín de la URL
    const { token } = req.params;

    // Leer el usuario que tiene ese token
    const veterinario = await Veterinario.findOne({ token });

    if (veterinario) {
        // Token válido -> Usuario existe
        res.json({ msg: 'Token válido' });
    } else {
        const error = new Error('Token no válido');
        return res.status(400).json({ msg: error.message });
    }
}

const nuevoPassword = async (req, res) => {
    // Leer el comodín de la URL
    const { token } = req.params;

    // Datos de la petición POST
    const { password } = req.body;

    // Leer el usuario que tiene ese token
    const veterinario = await Veterinario.findOne({ token });

    if (!veterinario) {
        const error = new Error('Token no válido');
        return res.status(400).json({ msg: error.message });
    }

    // Modificar el veterinario en la BD
    try {
        // Cambiar la contraseña y expirar el token
        veterinario.password = password; // Se hashea automáticamente por lo definido en el modelo
        veterinario.token = null;
        await veterinario.save();

        // Mostrar respuesta al usuario
        res.json({ msg: 'Contraseña restablecida correctamente' });
    } catch (error) {
        const errorBD = new Error('Hubo un error al modificar la contraseña');
        return res.status(400).json({ msg: error.message });
    }

}

export {
    registrar,
    confirmar,
    autenticar,
    perfil,
    restablecerPassword,
    comprobarTokenPass,
    nuevoPassword
}