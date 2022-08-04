import { useState } from "react";
import Alerta from "./Alerta";

const Formulario = () => {
    // States
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = e => {
        e.preventDefault();

        // Validar inputs vacíos
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
            return;
        }

        // Validar inputs vacíos
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
            return;
        }
    }

    // Verificar si hay alerta
    const { msg } = alerta;

    return (
        <>
            <p className="text-lg text-center mb-10">Añade tus Pacientes y <span className="text-indigo-600 font-bold">Administralos</span></p>

            <form className="bg-white py-10 px-5 mb-10 lg:mb-5 border shadow-lg rounded-xl" onSubmit={handleSubmit}>


                <div className="mb-5">
                    <label htmlFor="mascota" className="uppercase text-gray-700 font-bold">Nombre mascota</label>
                    <input type="text" name="mascota" id="mascota" placeholder="Nombre de la mascota" className="border-2 w-full p-3 mt-2 placeholder-gray-400 rounded-xl" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="uppercase text-gray-700 font-bold">Nombre propietario</label>
                    <input type="text" name="propietario" id="propietario" placeholder="Nombre del propietario" className="border-2 w-full p-3 mt-2 placeholder-gray-400 rounded-xl" value={propietario} onChange={e => setPropietario(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="uppercase text-gray-700 font-bold">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email del propietario" className="border-2 w-full p-3 mt-2 placeholder-gray-400 rounded-xl" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha" className="uppercase text-gray-700 font-bold">Fecha de alta</label>
                    <input type="date" name="fecha" id="fecha" className="border-2 w-full p-3 mt-2 placeholder-gray-400 rounded-xl" value={fecha} onChange={e => setFecha(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="uppercase text-gray-700 font-bold">Síntomas</label>
                    <textarea name="sintomas" id="sintomas" placeholder="Escribe los síntomas del paciente" className="border-2 w-full p-3 mt-2 placeholder-gray-400 rounded-xl" value={sintomas} onChange={e => setSintomas(e.target.value)} />
                </div>

                <input type="submit" value="Agregar paciente" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-xl" />
            </form>

            {
                // Verificar si hay alerta
                msg &&
                <Alerta
                    alerta={alerta}
                />
            }
        </>
    );
};

export default Formulario;