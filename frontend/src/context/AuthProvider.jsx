import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            // Obtener Token del LocalStorage y verificar si hay
            const token = localStorage.getItem('apv_token');

            if (!token) {
                setCargando(false);
                return;
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                // Conseguir la sesión del usuario y ponerla en el Context Auth
                const { data } = await clienteAxios.get('/veterinarios/perfil', config);
                setAuth(data.perfil);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando(false);
        }

        autenticarUsuario();
    }, []);

    const cerrarSesion = () => {
        // Eliminar LocalStorage y devolver el State a un objeto vacío
        localStorage.removeItem('apv_token');
        setAuth({});
    }

    const actualizarPerfil = async datos => {
        // Obtener Token del LocalStorage y verificar si hay
        const token = localStorage.getItem('apv_token');

        if (!token) {
            setCargando(false);
            return;
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(`/veterinarios/perfil/${datos._id}`, datos, config);
            return ({ msg: 'Actualizado correctamente', error: false });
        } catch (error) {
            return ({ msg: error.response.data.msg, error: true });
        }
    }

    const guardarPassword = async datos => {
        // Obtener Token del LocalStorage y verificar si hay
        const token = localStorage.getItem('apv_token');

        if (!token) {
            setCargando(false);
            return;
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put('/veterinarios/actualizarpassword', datos, config);
            return ({ msg: 'Contraseña actualizada correctamente', error: false });
        } catch (error) {
            return ({ msg: error.response.data.msg, error: true });
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth, setAuth, cargando, cerrarSesion, actualizarPerfil, guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider }

export default AuthContext;