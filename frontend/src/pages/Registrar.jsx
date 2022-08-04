import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import Alerta from "../components/Alerta";

const Registrar = () => {
    // States
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [alerta, setAlerta] = useState({});

    // Functions
    const handleSubmit = async e => {
        e.preventDefault();

        // Verificación de campos vacíos
        if ([nombre, email, password, passwordRepeat].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        // Verificar que las contraseñas sean iguales
        if (password !== passwordRepeat) {
            setAlerta({ msg: 'Las contraseñas no coinciden', error: true });
            return;
        }

        // Veficiar que la contraseña mida más de 6 carácteres
        if (password.length < 6) {
            setAlerta({ msg: 'La contraseña debe de tener más de 6 carácteres', error: true });
            return;
        }

        // Quitar la alerta
        setAlerta({})

        // Comunicación con el backend -> Crear el usuario en la API
        try {
            const url = "http://127.0.0.1:4000/api/veterinarios";
            await axios.post(url, { nombre, email, password });
            setAlerta({ msg: 'Usuario creado correctamente. Revisa tu email', error: false })
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true })
        }
    }

    // Usado para comprobar si hay un mensaje o no
    const { msg } = alerta;

    return (
        <>
            <div className="mb-5 md:mb-0">
                <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y <span className="text-black">Administra tus Pacientes</span></h1>
            </div>

            <div className="border rounded-xl p-5 mt-16 md:mt-0 shadow-lg bg-white">

                {/* Si en msg hay algo, mostrar una alerta */
                    msg && <Alerta
                        alerta={alerta}
                    />
                }

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                        <input type="text" placeholder="Tu nombre" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email" placeholder="Tu email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
                        <input type="password" placeholder="Tu contraseña" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="repetirPassword" className="uppercase text-gray-600 block text-xl font-bold">Repetir contraseña</label>
                        <input type="password" placeholder="Repite tu contraseña" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="password" value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} />
                    </div>

                    <input type="submit" value="Crear cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl uppercase font-bold text-white mb-5 hover:cursor-pointer hover:bg-indigo-800 xl:w-auto " />
                </form>


                <nav className="xl:flex xl:justify-between">
                    <Link to="/" className="block text-center mb-5 text-gray-500">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link to="/restablecer-password" className="block text-center mb-5 text-gray-500">¿Olvidaste tu contraseña?</Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar