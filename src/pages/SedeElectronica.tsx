import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  url: string;
}

export default function SedeElectronica() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<{ id: string; name: string } | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    loadUserDocuments();
  }, []);

  const loadUserDocuments = async () => {
    try {
      const userId = localStorage.getItem("alanizUserId");
      const userName = localStorage.getItem("alanizUserName");
      const authStatus = localStorage.getItem("alanizAuth");

      if (!userId || !authStatus || authStatus !== "ok") {
        navigate("/login");
        return;
      }

      // Simular carga
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Obtener documentos del usuario
      const allDocuments = JSON.parse(
        localStorage.getItem("alanizDocuments") || "{}"
      );
      const userDocuments = allDocuments[userId] || [];

      setDocuments(userDocuments);
      setUserInfo({ id: userId, name: userName || "Usuario" });
      setLoading(false);
    } catch (err) {
      console.error("Error cargando documentos:", err);
      setError("Error al cargar los documentos");
      setLoading(false);
    }
  };

  const handleDownload = (document: Document) => {
    try {
      if (!document.url || document.url === "#") {
        alert("El documento no está disponible para descarga.");
        return;
      }

      // Obtener el archivo desde localStorage
      const base64Data = localStorage.getItem(`file_${document.url}`);

      if (!base64Data) {
        alert("El archivo no está disponible en el almacenamiento local.");
        return;
      }

      // Convertir base64 a blob
      const byteCharacters = atob(base64Data.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Crear URL temporal y descargar
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = document.name;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Limpiar URL temporal
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar:", error);
      alert("Error al descargar el documento.");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("alanizAuth");
      localStorage.removeItem("alanizUserId");
      localStorage.removeItem("alanizUserType");
      localStorage.removeItem("alanizUserName");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Redirigir de todas formas
      window.location.href = "/login";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-alanizGold-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-alanizGold-600">Cargando documentos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950 p-4">
        <div className="text-center space-y-4">
          <div className="text-6xl text-red-400 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-400">
            Error al cargar
          </h2>
          <p className="text-parchment-300">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="btn-alaniz"
            >
              Reintentar
            </button>
            <button onClick={handleLogout} className="btn-secondary">
              Volver al Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alanizGreen-950 py-8">
      <div className="content-container">
        {/* Header */}
        <div className="card-elegant mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-alanizGold-600 rounded-full flex items-center justify-center">
                <span className="text-alanizGreen-950 text-xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-alanizGold-600">
                  Sede Electrónica
                </h1>
                <p className="text-parchment-300">
                  Bienvenido, {userInfo?.name}
                </p>
              </div>
            </div>
            <button onClick={handleLogout} className="btn-secondary">
              Cerrar Sesión
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-alanizGreen-900/30 rounded-lg p-4">
              <h3 className="font-semibold text-alanizGold-600 mb-2">DNI</h3>
              <p className="text-parchment-300">{userInfo?.id || "N/A"}</p>
            </div>
            <div className="bg-alanizGreen-900/30 rounded-lg p-4">
              <h3 className="font-semibold text-alanizGold-600 mb-2">
                Documentos
              </h3>
              <p className="text-parchment-300">{documents.length}</p>
            </div>
            <div className="bg-alanizGreen-900/30 rounded-lg p-4">
              <h3 className="font-semibold text-alanizGold-600 mb-2">Estado</h3>
              <p className="text-green-400">Activo</p>
            </div>
          </div>
        </div>

        {/* Documentos */}
        <div className="card-elegant">
          <h2 className="text-xl font-display font-bold text-alanizGold-600 mb-6">
            Mis Documentos
          </h2>

          {documents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl text-alanizGold-600/30 mb-4">📄</div>
              <h3 className="text-lg font-medium text-alanizGold-600 mb-2">
                No hay documentos disponibles
              </h3>
              <p className="text-parchment-400">
                Los documentos aparecerán aquí cuando sean asignados por la
                administración.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-alanizGreen-900/30 rounded-lg p-4 
                                             hover:bg-alanizGreen-900/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-10 h-10 bg-alanizGold-600/20 rounded-lg 
                                      flex items-center justify-center"
                      >
                        <span className="text-alanizGold-600">
                          {doc.type === "Recompensas"
                            ? "🏆"
                            : doc.type === "Nombramientos"
                            ? "⚔️"
                            : "📄"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-alanizGold-600">
                          {doc.name}
                        </h3>
                        <p className="text-sm text-parchment-400">
                          {doc.type} • {doc.size} • {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          // Crear URL temporal para ver el PDF
                          const base64Data = localStorage.getItem(
                            `file_${doc.url}`
                          );
                          if (base64Data) {
                            const byteCharacters = atob(
                              base64Data.split(",")[1]
                            );
                            const byteNumbers = new Array(
                              byteCharacters.length
                            );
                            for (let i = 0; i < byteCharacters.length; i++) {
                              byteNumbers[i] = byteCharacters.charCodeAt(i);
                            }
                            const byteArray = new Uint8Array(byteNumbers);
                            const blob = new Blob([byteArray], {
                              type: "application/pdf",
                            });
                            const url = URL.createObjectURL(blob);
                            window.open(url, "_blank");
                          } else {
                            alert("No se puede visualizar el documento.");
                          }
                        }}
                        className="btn-secondary text-sm"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="btn-alaniz text-sm"
                        disabled={!doc.url || doc.url === "#"}
                      >
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="card-elegant mt-8">
          <h3 className="font-semibold text-alanizGold-600 mb-4">
            Información Importante
          </h3>
          <div className="bg-alanizGreen-900/30 rounded-lg p-4">
            <ul className="space-y-2 text-parchment-300 text-sm">
              <li>
                • Los documentos están firmados digitalmente por la Casa Alaniz
              </li>
              <li>• Mantén tus credenciales seguras y no las compartas</li>
              <li>
                • Para solicitar nuevos documentos, contacta con la
                administración
              </li>
              <li>
                • Los documentos tienen validez oficial para trámites
                genealógicos
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
