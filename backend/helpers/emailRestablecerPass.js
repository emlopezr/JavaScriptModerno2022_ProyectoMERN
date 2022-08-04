import nodemailer from "nodemailer";

const emailRestablecerPassword = async (email, nombre, token) => {
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
        subject: 'Restablece tu contraseña en APV',
        text: 'Restablece tu contraseña en APV',
        html: `
        <p>Hola ${nombre}! Has solicitado restablecer tu contraseña en APV.</p>
        <p>
            Solo tienes que entrar al enlace para configurar nueva tu contraseña: <a href="${process.env.FRONTEND_URL}/restablecerpassword/${token}">Restablecer contraseña</a>
        </p>
        <p>Si no fuiste tu quien pidió este cambio. Por favor ignora este mensaje</p>
        `
    });

    console.log(`Email enviado: ${info.messageId}`)
}

export default emailRestablecerPassword;