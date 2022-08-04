import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import RestablecerPassword from "./pages/RestablecerPassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import { AuthProvider } from "./context/AuthProvider";
import AdministrarPacientes from "./pages/AdministrarPacientes";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Área pública */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="restablecerpassword" element={<RestablecerPassword />} />
            <Route path="restablecerpassword/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
          </Route>

          {/* Área privada */}
          <Route path="/admin" element={<RutaProtegida />}>
            <Route index element={<AdministrarPacientes />} />
            <Route path="perfil" element={<AdministrarPacientes />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
