import { Link } from "react-router-dom";

const AdminNav = () => {
    return (
        <nav className="flex gap-4">
            <Link to="/admin/perfil" className="font-bold text-gray-500">Editar Perfil</Link>
            <Link to="/admin/cambiarpassword" className="font-bold text-gray-500">Cambiar Contraseña</Link>
        </nav>
    );
};

export default AdminNav;