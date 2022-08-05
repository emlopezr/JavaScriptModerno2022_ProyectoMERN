import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
    // Props
    const { nombre, propietario, email, fecha, sintomas, _id } = paciente;

    // Context
    const { setEdicion, eliminarPaciente } = usePacientes()

    return (
        <div className="m-10 bg-white border shadow-lg rounded-xl py-10 px-5">
            <p className="font-bold uppercase text-xl mb-4">{nombre}</p>
            <p className="font-bold uppercase text-indigo-700 mb-2">Propietario: <span className="font-normal normal-case text-black">{propietario}</span></p>
            <p className="font-bold uppercase text-indigo-700 mb-2">Email de contacto: <span className="font-normal normal-case text-black">{email}</span></p>
            <p className="font-bold uppercase text-indigo-700 mb-2">Fecha de alta: <span className="font-normal normal-case text-black">{fecha.split('T')[0]}</span></p>
            <p className="font-bold uppercase text-indigo-700">Síntomas: <span className="font-normal normal-case text-black">{sintomas}</span></p>

            <div className="flex gap-4 mt-4">
                <button type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white uppercase text-center rounded-xl font-bold" onClick={() => setEdicion(paciente)}>
                    Editar
                </button>
                <button type="button" className="py-2 px-10 bg-red-600 hover:bg-red-800 transition-colors text-white uppercase text-center rounded-xl font-bold" onClick={() => eliminarPaciente(_id)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default Paciente;