import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [dni, setDni] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    initializeAdmin();

    // Verificar si ya está autenticado
    const authStatus = localStorage.getItem("alanizAuth");
    if (authStatus === "ok") {
      const userType = localStorage.getItem("alanizUserType");
      if (userType === "admin") {
        navigate("/admin");
      } else {
        navigate("/sede-electronica");
      }
    }
  }, [navigate]);

  // Inicializar solo administrador
  const initializeAdmin = () => {
    const existingUsers = localStorage.getItem("alanizUsers");

    if (!existingUsers) {
      const adminUser = {
        "34323575P": {
          name: "Administrador",
          password: "110788",
          type: "admin",
          createdDate: new Date().toISOString(),
        },
      };

      localStorage.setItem("alanizUsers", JSON.stringify(adminUser));
      localStorage.setItem("alanizDocuments", JSON.stringify({}));
    }
  };

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Obtener usuarios del sistema
    const users = JSON.parse(localStorage.getItem("alanizUsers") || "{}");

    // Buscar usuario por DNI
    const user = users[dni.toUpperCase()];

    if (user && user.password === pass) {
      // Guardar autenticación
      localStorage.setItem("alanizAuth", "ok");
      localStorage.setItem("alanizAuthTimestamp", Date.now().toString());
      localStorage.setItem("alanizUserId", dni.toUpperCase());
      localStorage.setItem("alanizUserType", user.type);
      localStorage.setItem("alanizUserName", user.name);

      setError("success");
      setTimeout(() => {
        // Redirigir según tipo de usuario
        if (user.type === "admin") {
          navigate("/admin");
        } else {
          navigate("/sede-electronica");
        }
      }, 1000);
    } else {
      setError("DNI o contraseña incorrectos.");
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-alanizGold-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950 p-4">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-alanizGold-600/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-alanizGold-600/3 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Contenedor principal del formulario */}
        <div className="card-elegant animate-fade-in-up shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 bg-alanizGold-600 
                            rounded-full shadow-lg mb-6"
            >
              <span className="w-8 h-8 text-alanizGreen-950 text-2xl">🛡️</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-display font-bold text-alanizGold-600 mb-2">
              Acceso Privado
            </h1>

            <p className="text-parchment-300 text-sm">
              Área reservada para miembros verificados de la Casa Alaniz
            </p>
          </div>

          {/* Mensajes de estado */}
          {error && error !== "success" && (
            <div
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg 
                            animate-fade-in-down"
            >
              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5">
                  ⚠️
                </span>
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {error === "success" && (
            <div
              className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg 
                            animate-fade-in-down"
            >
              <div className="flex items-center space-x-3">
                <span className="w-5 h-5 text-green-400">✅</span>
                <p className="text-green-400 text-sm font-medium">
                  Acceso autorizado. Redirigiendo...
                </p>
              </div>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handle} className="form-elegant">
            {/* Campo de DNI */}
            <div>
              <label
                htmlFor="dni"
                className="block text-sm font-medium text-alanizGold-600 mb-2"
              >
                DNI
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="h-5 w-5 text-alanizGold-600/50">🆔</span>
                </div>
                <input
                  id="dni"
                  type="text"
                  placeholder="DNI del usuario"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.toUpperCase())}
                  required
                  disabled={isLoading}
                  maxLength={9}
                  className="pl-10 w-full px-4 py-3 bg-alanizGreen-800/50 
                             border border-alanizGold-600/30 rounded-lg
                             text-parchment-100 placeholder-parchment-400
                             focus:border-alanizGold-600 focus:bg-alanizGreen-800/70
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-300 uppercase"
                />
              </div>
            </div>

            {/* Campo de contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-alanizGold-600 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="h-5 w-5 text-alanizGold-600/50">🔒</span>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10 pr-10 w-full px-4 py-3 bg-alanizGreen-800/50 
                             border border-alanizGold-600/30 rounded-lg
                             text-parchment-100 placeholder-parchment-400
                             focus:border-alanizGold-600 focus:bg-alanizGreen-800/70
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center 
                             text-alanizGold-600/50 hover:text-alanizGold-600 
                             disabled:opacity-50 transition-colors duration-200"
                >
                  {showPassword ? (
                    <span className="h-5 w-5">🙈</span>
                  ) : (
                    <span className="h-5 w-5">👁️</span>
                  )}
                </button>
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isLoading || !dni || !pass}
              className="w-full btn-alaniz disabled:opacity-50 disabled:cursor-not-allowed 
                         disabled:hover:scale-100 relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div
                    className="w-4 h-4 border-2 border-alanizGreen-950 border-t-transparent 
                                  rounded-full animate-spin"
                  ></div>
                  <span>Verificando...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-5 h-5">🔒</span>
                  <span>Acceder al Sistema</span>
                </div>
              )}
            </button>
          </form>

          {/* Información adicional */}
          <div className="mt-8 pt-6 border-t border-alanizGold-600/20">
            <div className="bg-alanizGreen-900/30 rounded-lg p-4">
              <h3 className="font-semibold text-alanizGold-600 text-sm mb-2">
                Solo para Miembros Verificados
              </h3>
              <p className="text-xs text-parchment-400 leading-relaxed mb-3">
                El acceso está restringido a miembros oficiales de la Casa
                Alaniz con credenciales válidas.
              </p>
              <div className="flex items-center justify-between text-xs text-parchment-500">
                <span>¿No tienes acceso?</span>
                <a
                  href="/contacto"
                  className="text-alanizGold-600 hover:text-alanizGold-500 
                             transition-colors duration-200 underline-offset-2 hover:underline"
                >
                  Contactar administración
                </a>
              </div>
            </div>
          </div>

          {/* Footer del formulario */}
          <div className="mt-6 text-center">
            <p className="text-xs text-parchment-500">
              Protegido por medidas de seguridad de la Casa Alaniz
            </p>
          </div>
        </div>

        {/* Enlace para volver */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-alanizGold-600/70 hover:text-alanizGold-600 
                       transition-colors duration-200 underline-offset-2 hover:underline"
          >
            ← Volver al Archivo Principal
          </a>
        </div>
      </div>
    </div>
  );
}
