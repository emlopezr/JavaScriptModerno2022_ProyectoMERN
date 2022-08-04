import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
    // States
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passCambiada, setPassCambiada] = useState(false);

    // Token de la URL
    const { token } = useParams();

    // Validar que el token sea válido
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios.get(`/veterinarios/restablecerpassword/${token}`);
                setAlerta({ msg: 'Coloca tu nueva contraseña', error: false });
                setTokenValido(true);
            } catch (error) {
                setAlerta({ msg: 'Hubo un error con el enlace. Intenta de nuevo', error: true })
            }
        }

        comprobarToken();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        // Verificación de campos vacíos
        if ([password, passwordRepeat].includes('')) {
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

        // Comunicación con el backend -> Modificar el usuario en la API
        try {
            const { data } = await clienteAxios.post(`/veterinarios/restablecerpassword/${token}`, { password });
            setAlerta({ msg: data.msg, error: false })
            setTokenValido(false);
            setPassCambiada(true);
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true })
        }
    }

    // Verificar si hay alerta
    const { msg } = alerta;

    return (
        <>
            <div className="mb-5 md:mb-0">
                <h1 className="text-indigo-600 font-black text-6xl">Restablece tu Contraseña y no Pierdas <span className="text-black">Acceso a tus Pacientes</span></h1>
            </div>

            <div className="border rounded-xl p-5 mt-16 md:mt-0 shadow-lg bg-white">

                {
                    /* Si en msg hay algo, mostrar una alerta */
                    msg &&
                    <Alerta
                        alerta={alerta}
                    />
                }

                {
                    // Solo mostrar el formulario si el token es válido
                    tokenValido &&
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nueva contraseña</label>
                            <input type="password" placeholder="Nueva contraseña" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="repetirPassword" className="uppercase text-gray-600 block text-xl font-bold">Repetir contraseña</label>
                            <input type="password" placeholder="Repite tu nueva contraseña" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="password" value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} />
                        </div>

                        <input type="submit" value="Restablecer contraseña" className="bg-indigo-700 w-full py-3 px-10 rounded-xl uppercase font-bold text-white mb-5 hover:cursor-pointer hover:bg-indigo-800 xl:w-auto " />
                    </form>
                }

                {
                    passCambiada &&
                    <Link to="/" className="block text-center mb-5 text-gray-500">Inicia Sesión</Link>
                }


            </div>
        </>
    );
};

export default NuevoPassword;
