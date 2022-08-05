import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
    // States
    const [pacientes, setPacientes] = useState([]);
    const [pacienteEdicion, setPacienteEdicion] = useState({});

    // Effect -> Cuando se cargue el componente conseguir todos los pacientes
    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                // Obtener Token del LocalStorage y verificar si hay
                const token = localStorage.getItem('apv_token');

                if (!token) {
                    return;
                };

                // Autorización
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                // Conseguir los pacientes y ponerlos en el state
                const { data } = await clienteAxios.get('/pacientes', config);
                setPacientes(data.reverse()); // Obtener los más recientes primero
            } catch (error) {
                console.log(error);
            }
        }

        obtenerPacientes();
    }, []);

    // Funciones
    const guardarPaciente = async paciente => {
        // Obtener Token del LocalStorage y verificar si hay
        const token = localStorage.getItem('apv_token');

        if (!token) {
            return;
        };

        // Autorización
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        // ¿Estamos editando? -> Si
        if (paciente.id) {
            try {
                // Hacer inserción en la base de datos por medio del API
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                // Cambiar datos del paciente actualizado en el State
                const pacientesActualizado = pacientes.map(pacienteState => {
                    if (pacienteState._id === data._id) {
                        return data;
                    } else {
                        return pacienteState;
                    }
                })

                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error);
            }

            return;
        }

        // Estamos creando un nuevo paciente
        try {
            // Hacer inserción en la base de datos por medio del API
            const { data } = await clienteAxios.post('/pacientes', paciente, config);

            // Insertar en el State la información del paciente nuevo -> Eliminar estas propiedades innecesarias
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
            setPacientes([pacienteAlmacenado, ...pacientes]);

        } catch (error) {
            console.log(error);
        }
    }

    const setEdicion = paciente => {
        setPacienteEdicion(paciente);
    }

    const eliminarPaciente = id => {
        // Confirmacion de alerta
        const confirmar = confirm('¿Confirmas que quieres eliminar?');

        if (confirmar) {
            try {
                // Obtener Token del LocalStorage y verificar si hay
                const token = localStorage.getItem('apv_token');

                if (!token) {
                    return;
                };

                // Autorización
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                // Eliminación de la base de datos
                const { data } = clienteAxios.delete(`/pacientes/${id}`, config);

                // Eliminar el paciente de la lista
                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);
                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes, guardarPaciente, setEdicion, pacienteEdicion, eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export { PacientesProvider }

export default PacientesContext;