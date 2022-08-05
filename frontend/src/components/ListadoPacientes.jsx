import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
    // Context
    const { pacientes } = usePacientes();

    return (
        <>
            {pacientes.length
                ? (
                    <>
                        <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
                        <p className="text-xl mt-5 mb-10 text-center">Administra tus <span className="text-indigo-600 font-bold">Pacientes y Citas</span></p>

                        {
                            // Iterar lista de pacientes
                            pacientes.map(paciente => (
                                <Paciente
                                    key={paciente._id}
                                    paciente={paciente}
                                />
                            ))
                        }
                    </>
                )
                : (
                    <>
                        <h2 className="font-black text-3xl text-center">Aún no Tienes Pacientes Registrados</h2>
                        <p className="text-xl mt-5 mb-10 text-center">Comienza agregando Pacientes <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span></p>
                    </>
                )
            }
        </>
    );
};

export default ListadoPacientes;