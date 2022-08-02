import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarID.js";

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    },
});

// Antes de almacenar el registro, hashear el password
veterinarioSchema.pre('save', async function (next) { // No se usa Arrow function para poder usar "this" sobre veterinarioSchema
    // Verificación para no hashear un password dos veces
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10); // "10 rondas de hasheo"
    this.password = await bcrypt.hash(this.password, salt);
});

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);

export default Veterinario;