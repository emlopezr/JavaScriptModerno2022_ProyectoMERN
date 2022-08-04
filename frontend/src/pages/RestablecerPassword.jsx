import { useState } from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"

const RestablecerPassword = () => {
    // Satates
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        // Validación de input vacío
        if (email === '') {
            setAlerta({ msg: 'El email es obligatorio', error: true });
            return;
        }

        try {
            // Petición POST
            const { data } = await clienteAxios.post('veterinarios/restablecerpassword', { email })

            setAlerta({ msg: data.msg, error: false });
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true });
        }
    }

    // Verificar si hay una alerta
    const { msg } = alerta;

    return (
        <>
            <div className="mb-5 md:mb-0">
                <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Cuenta y no Pierdas el <span className="text-black">Acceso a tus Pacientes</span></h1>
            </div>

            <div className="border rounded-xl p-5 mt-16 md:mt-0 shadow-lg bg-white">
                {
                    // Verificar si hay una alerta
                    msg &&
                    <Alerta
                        alerta={alerta}
                    />
                }

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email" placeholder="Tu email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <input type="submit" value="Envíar correo" className="bg-indigo-700 w-full py-3 px-10 rounded-xl uppercase font-bold text-white mb-5 hover:cursor-pointer hover:bg-indigo-800 xl:w-auto " />
                </form>

                <nav className="xl:flex xl:justify-between">
                    <Link to="/" className="block text-center mb-5 text-gray-500">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link to="/registrar" className="block text-center mb-5 text-gray-500">¿No tienes una cuenta? Regístrate</Link>
                </nav>
            </div>
        </>
    )
}

export default RestablecerPassword