import nodemailer from "nodemailer";

const emailRegistro = async (email, nombre, token) => {
    // Credenciales de Mailtrap 
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Envíar el Email
    const info = await transport.sendMail({
        from: 'APV - Administrador de Pacientes de Veterinaria',
        to: email,
        subject: 'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta en APV',
        html: `
        <p>Hola ${nombre}! Comprueba tu cuenta en APV.</p>
        <p>
            Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        </p>
        <p>Si no fuiste tu quien creó la cuenta. Por favor ignora este mensaje</p>
        `
    });

    console.log(`Email enviado: ${info.messageId}`)
}

export default emailRegistro;