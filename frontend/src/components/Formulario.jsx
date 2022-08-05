import { useState, useEffect } from "react";
import usePacientes from "../hooks/usePacientes";
import Alerta from "./Alerta";

const Formulario = () => {
    // States
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);
    const [alerta, setAlerta] = useState({});

    // Context
    const { guardarPaciente, pacienteEdicion } = usePacientes();

    // Effect -> Leer si estamos editando un paciente -> Se ejecuta al renderizar o cuando cambia el valor de "pacienteEdicion"
    useEffect(() => {
        if (pacienteEdicion?.nombre) {
            setNombre(pacienteEdicion.nombre);
            setPropietario(pacienteEdicion.propietario);
            setEmail(pacienteEdicion.email);
            setFecha(pacienteEdicion.fecha.split('T')[0]);
            setSintomas(pacienteEdicion.sintomas);
            setId(pacienteEdicion._id);
        }
    }, [pacienteEdicion]);

    const handleSubmit = e => {
        e.preventDefault();

        // Validar inputs vacíos
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
            return;
        }

        // Resetear el formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId(null);

        // Mostrar alerta
        setAlerta({ msg: 'Guardado correctamente', error: false });

        // Guardar paciente en la BD
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
    }

    // Verificar si hay alerta
    const { msg } = alerta;

    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">Añade tus <span className="text-indigo-600 font-bold">Pacientes y Administralos</span></p>

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

                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-xl" value={id ? 'Editar paciente' : 'Agregar paciente'} />
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