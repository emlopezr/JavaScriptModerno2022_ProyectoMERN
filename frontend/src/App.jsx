import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import RestablecerPassword from "./pages/RestablecerPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";

function App() {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={<Registrar />} />
          <Route path="restablecer-password" element={<RestablecerPassword />} />
          <Route path="confirmar/:id" element={<ConfirmarCuenta />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
