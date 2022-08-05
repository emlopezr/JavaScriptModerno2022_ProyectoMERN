import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
    // States
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});

    // Sacar la información del usuario por medio del Context provider
    const { auth, actualizarPerfil } = useAuth();

    useEffect(() => {
        setPerfil(auth);
    }, [auth]);

    // Funciones
    const handleSubmit = async e => {
        e.preventDefault();

        // Solo validar nombre e email
        const { nombre, email } = perfil;

        if ([nombre, email].includes('')) {
            setAlerta({ msg: 'Los campos "Nombre" e "Email" son obligatorios', error: true })
            return;
        }

        const resultado = await actualizarPerfil(perfil);
        setAlerta(resultado)
    }

    const { msg } = alerta;

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl mt-5 mn-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Información Aquí</span></p>

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
                            <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                            <input type="text" name="nombre" id="nombre" className="border w-full p-2 mt-3 rounded-xl" placeholder="Tu nombre" value={perfil.nombre || ''} onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                            <input type="email" name="email" id="email" className="border w-full p-2 mt-3 rounded-xl" placeholder="Tu email" value={perfil.email || ''} onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio web</label>
                            <input type="text" name="web" id="web" className="border w-full p-2 mt-3 rounded-xl" placeholder="Tu web" value={perfil.web || ''} onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })} />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Teléfono</label>
                            <input type="tel" name="telefono" id="telefono" className="border w-full p-2 mt-3 rounded-xl" placeholder="Tu teléfono" value={perfil.telefono || ''} onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })} />
                        </div>

                        <input type="submit" value="Guardar cambios" className="bg-indigo-600 px-10 py-3 font-bold text-white rounded-xl uppercase text-center w-full hover:bg-indigo-700 transition-colors cursor-pointer mt-5" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditarPerfil;