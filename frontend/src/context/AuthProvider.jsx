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

    return (
        <AuthContext.Provider
            value={{
                auth, setAuth, cargando, cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider }

export default AuthContext;