import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
    // States
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    // Leer parámetros de la URL
    const params = useParams();
    const { token } = params

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${token}`;
                const { data } = await clienteAxios.get(url);

                setCuentaConfirmada(true);
                setAlerta({ msg: data.msg, error: false });
            } catch (error) {
                setAlerta({ msg: error.response.data.msg, error: true });
            }

            setCargando(false);
        }

        confirmarCuenta();
    }, []);

    return (
        <>
            <div className="mb-5 md:mb-0">
                <h1 className="text-indigo-600 font-black text-6xl">Confirma tu Cuenta y <span className="text-black">Comienza a Administrar tus Pacientes</span></h1>
            </div>

            <div className="border rounded-xl p-5 mt-16 md:mt-0 shadow-lg bg-white">
                {
                    /* Mostrar alerta cuando no esté cargando */
                    !cargando &&
                    <Alerta
                        alerta={alerta}
                    />
                }

                {
                    /* Si se confirmó la cuenta, mostrar botón para iniciar sesión */
                    cuentaConfirmada &&
                    <Link to="/" className="block text-center mb-5 text-gray-500">Inicia Sesión</Link>
                }
            </div>
        </>
    )
}

export default ConfirmarCuenta