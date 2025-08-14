import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Historia from "../pages/Historia";
import Simbolos from "../pages/Simbolos";
import Login from "../pages/Login";
import Miembros from "../pages/Miembros";
import Legado from "../pages/Legado";
import Documentos from "../pages/Documentos";
import Condecoraciones from "../pages/Condecoraciones";
import SedeElectronica from "../pages/SedeElectronica";
import Contacto from "../pages/Contacto";

const AppRouter = () => {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/simbolos" element={<Simbolos />} />
      <Route path="/legado" element={<Legado />} />
      <Route path="/documentos" element={<Documentos />} />
      <Route path="/condecoraciones" element={<Condecoraciones />} />
      <Route path="/sede-electronica" element={<SedeElectronica />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/miembros"
        element={isAuthenticated ? <Miembros /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRouter;
