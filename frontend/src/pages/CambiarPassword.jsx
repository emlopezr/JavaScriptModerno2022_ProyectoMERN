import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
    // States
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    })

    // Context
    const { guardarPassword } = useAuth()

    // Funciones
    const handleSubmit = async e => {
        e.preventDefault();

        // Verificar inputs
        if (Object.values(password).some(campo => campo === '')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }

        if (password.pwd_nuevo.length < 6) {
            setAlerta({ msg: 'La contraseña nueva debe de tener más de 6 carácteres', error: true });
        }

        // Verificar que la contraseña actual sea correcta
        if (password.pwd_nuevo.length < 6) {
            setAlerta({ msg: 'La contraseña nueva debe de tener más de 6 carácteres', error: true });
            return;
        }

        const resultado = await guardarPassword(password)
        setAlerta(resultado)
    }

    const { msg } = alerta;

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
            <p className="text-xl mt-5 mn-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Contraseña Aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-5 border mt-10">

                    {
                        // Mostrar alerta si es necesario
                        msg &&
                        <Alerta
                            alerta={alerta}
                        />
                    }

                    <form onSubmit={handleSubmit}>

                        <div className="mb-5">
                            <label htmlFor="pwd_actual" className="uppercase font-bold text-gray-600">Contraseña actual</label>
                            <input type="password" name="pwd_actual" id="pwd_actual" className="border w-full p-2 mt-3 rounded-xl" placeholder="Escribe tu contraseña actual" onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="pwd_nuevo" className="uppercase font-bold text-gray-600">Nueva contraseña</label>
                            <input type="password" name="pwd_nuevo" id="pwd_nuevo" className="border w-full p-2 mt-3 rounded-xl" placeholder="Escribe tu nueva contraseña" onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })} />
                        </div>

                        <input type="submit" value="Guardar cambios" className="bg-indigo-600 px-10 py-3 font-bold text-white rounded-xl uppercase text-center w-full hover:bg-indigo-700 transition-colors cursor-pointer mt-5" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default CambiarPassword;