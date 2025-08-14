import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Imports directos para páginas principales
import Home from "../pages/Home";
import Historia from "../pages/Historia";
import Simbolos from "../pages/Simbolos";
import Login from "../pages/Login";
import Miembros from "../pages/Miembros";

// Lazy loading para páginas secundarias
const Legado = lazy(() => import("../pages/Legado"));
const Documentos = lazy(() => import("../pages/Documentos"));
const Condecoraciones = lazy(() => import("../pages/Condecoraciones"));
const SedeElectronica = lazy(() => import("../pages/SedeElectronica"));
const Contacto = lazy(() => import("../pages/Contacto"));

// Chat - Verificar que estos archivos existen
const ChatFamiliar = lazy(() => import("../pages/ChatFamiliar").catch(() => {
  console.error("No se pudo cargar ChatFamiliar.tsx");
  return { default: () => <div>Error cargando el chat</div> };
}));

const ChatAdmin = lazy(() => import("../pages/ChatAdmin").catch(() => {
  console.error("No se pudo cargar ChatAdmin.tsx");
  return { default: () => <div>Error cargando el panel admin</div> };
}));

// Componente de carga
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-alanizGold-600">Cargando...</div>
  </div>
);

const AppRouter = () => {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  
  return (
    <Suspense fallback={<LoadingFallback />}>
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
        <Route path="/chat" element={<ChatFamiliar />} />
        <Route path="/chat-admin" element={<ChatAdmin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
