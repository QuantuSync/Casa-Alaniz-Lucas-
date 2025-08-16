import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CONFIGURACIÓN SUPABASE
const SUPABASE_URL = 'https://rbicywnjsbrbezomrnss.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiaWN5d25qc2JyYmV6b21ybnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MjE5MDgsImV4cCI6MjA3MDQ5NzkwOH0.eVW1XGZVFmQa49-Ai2rwqSXbMdthqHHRZsCpOU3k6bw';

interface DocumentoUsuario {
  id: string;
  usuario_dni: string;
  nombre: string;
  tipo: string;
  fecha_subida: string;
  tamaño: string;
  url_supabase: string;
  created_at: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  url: string;
}

export default function SedeElectronica() {
  const [documents, setDocuments] = useState<DocumentoUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<{ id: string; name: string } | null>(null);
  const [error, setError] = useState<string>("");
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserDocuments();
  }, []);

  // Test de conexión a Supabase
  const testSupabaseConnection = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      setSupabaseConnected(response.ok);
      return response.ok;
    } catch (error) {
      console.error('Error conectando con Supabase:', error);
      setSupabaseConnected(false);
      return false;
    }
  };

  // Función para cargar documentos desde Supabase
  const loadUserDocumentsFromSupabase = async (userDni: string) => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/documentos_usuarios?usuario_dni=eq.${userDni}&select=*&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar documentos desde Supabase');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error cargando documentos de Supabase:', error);
      return null;
    }
  };

  // Función fallback para cargar documentos desde localStorage
  const loadUserDocumentsFromLocalStorage = (userDni: string): DocumentoUsuario[] => {
    try {
      const allDocuments = JSON.parse(localStorage.getItem("alanizDocuments") || "{}");
      const userDocuments = allDocuments[userDni] || [];
      
      // Convertir formato antiguo al nuevo
      return userDocuments.map((doc: Document) => ({
        id: doc.id,
        usuario_dni: userDni,
        nombre: doc.name,
        tipo: doc.type,
        fecha_subida: doc.uploadDate,
        tamaño: doc.size,
        url_supabase: doc.url,
        created_at: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error cargando documentos de localStorage:', error);
      return [];
    }
  };

  const loadUserDocuments = async () => {
    try {
      const userId = localStorage.getItem("alanizUserId");
      const userName = localStorage.getItem("alanizUserName");
      const authStatus = localStorage.getItem("alanizAuth");

      if (!userId || !authStatus || authStatus !== "ok") {
        navigate("/login");
        return;
      }

      // Test conexión Supabase
      const connected = await testSupabaseConnection();

      // Simular carga
      await new Promise((resolve) => setTimeout(resolve, 500));

      let userDocuments: DocumentoUsuario[] = [];

      // Intentar cargar desde Supabase primero
      if (connected) {
        const supabaseDocuments = await loadUserDocumentsFromSupabase(userId);
        if (supabaseDocuments) {
          userDocuments = supabaseDocuments;
        }
      }

      // Si no hay documentos en Supabase o no está conectado, usar localStorage
      if (userDocuments.length === 0) {
        userDocuments = loadUserDocumentsFromLocalStorage(userId);
      }

      setDocuments(userDocuments);
      setUserInfo({ id: userId, name: userName || "Usuario" });
      setLoading(false);
    } catch (err) {
      console.error("Error cargando documentos:", err);
      setError("Error al cargar los documentos");
      setLoading(false);
    }
  };

  const handleDownload = async (document: DocumentoUsuario) => {
    try {
      // Si el documento tiene URL de Supabase, usar esa
      if (document.url_supabase && document.url_supabase.includes('supabase')) {
        // Abrir directamente la URL de Supabase
        window.open(document.url_supabase, '_blank');
        return;
      }

      // Fallback: buscar en localStorage (formato antiguo)
      const base64Data = localStorage.getItem(`file_${document.url_supabase}`);
      if (!base64Data) {
        alert("El archivo no está disponible para descarga.");
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
      link.download = document.nombre;
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

  const handleViewDocument = (document: DocumentoUsuario) => {
    try {
      // Si el documento tiene URL de Supabase, usar esa
      if (document.url_supabase && document.url_supabase.includes('supabase')) {
        window.open(document.url_supabase, '_blank');
        return;
      }

      // Fallback: buscar en localStorage (formato antiguo)
      const base64Data = localStorage.getItem(`file_${document.url_supabase}`);
      if (base64Data) {
        const byteCharacters = atob(base64Data.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        alert("No se puede visualizar el documento.");
      }
    } catch (error) {
      console.error("Error al ver documento:", error);
      alert("Error al visualizar el documento.");
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
          <h2 className="text-xl font-semibold text-red-400">Error al cargar</h2>
          <p className="text-parchment-300">{error}</p>
          <div className="space-x-4">
            <button onClick={() => window.location.reload()} className="btn-alaniz">
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
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  <span className={`text-xs ${supabaseConnected ? 'text-green-400' : 'text-yellow-400'}`}>
                    {supabaseConnected ? 'Sistema global' : 'Modo local'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => testSupabaseConnection()}
                className="btn-secondary text-sm"
              >
                🔄 Test
              </button>
              <button onClick={handleLogout} className="btn-secondary">
                Cerrar Sesión
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-alanizGreen-900/30 rounded-lg p-4">
              <h3 className="font-semibold text-alanizGold-600 mb-2">DNI</h3>
              <p className="text-parchment-300">{userInfo?.id || "N/A"}</p>
            </div>
            <div className="bg-alanizGreen-900/30 rounded-lg p-4">
              <h3 className="font-semibold text-alanizGold-600 mb-2">Documentos</h3>
              <p className="text-parchment-300">{documents.length}</p>
            </div>
            <div className="bg-alanizGreen-900/30 rounded-lg p-4">
              <h3 className="font-semibold text-alanizGold-600 mb-2">Estado</h3>
              <p className={supabaseConnected ? "text-green-400" : "text-yellow-400"}>
                {supabaseConnected ? 'Global' : 'Local'}
              </p>
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
                Los documentos aparecerán aquí cuando sean asignados por la administración.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-alanizGreen-900/30 rounded-lg p-4 hover:bg-alanizGreen-900/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-alanizGold-600/20 rounded-lg flex items-center justify-center">
                        <span className="text-alanizGold-600">
                          {doc.tipo === "Recompensas" ? "🏆" : 
                           doc.tipo === "Nombramientos" ? "⚔️" : "📄"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-alanizGold-600">
                          {doc.nombre}
                        </h3>
                        <p className="text-sm text-parchment-400">
                          {doc.tipo} • {doc.tamaño} • {doc.fecha_subida}
                        </p>
                        <p className="text-xs text-parchment-500">
                          {doc.url_supabase?.includes('supabase') ? '☁️ Global' : '💾 Local'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDocument(doc)}
                        className="btn-secondary text-sm"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="btn-alaniz text-sm"
                        disabled={!doc.url_supabase || doc.url_supabase === "#"}
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
              <li>• Los documentos están firmados digitalmente por la Casa Alaniz</li>
              <li>• Mantén tus credenciales seguras y no las compartas</li>
              <li>• Para solicitar nuevos documentos, contacta con la administración</li>
              <li>• Los documentos tienen validez oficial para trámites genealógicos</li>
              <li>• {supabaseConnected ? 'Sistema sincronizado globalmente' : 'Modo offline - documentos locales'}</li>
            </ul>
          </div>

          {/* Información técnica */}
          <div className="mt-4 p-3 bg-alanizGreen-800/20 rounded-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="text-parchment-500">Estado del sistema:</span>
              <div className="flex items-center space-x-2">
                <span className={supabaseConnected ? 'text-green-400' : 'text-yellow-400'}>
                  {supabaseConnected ? '☁️ Supabase conectado' : '💾 Solo localStorage'}
                </span>
                <button
                  onClick={async () => {
                    const connected = await testSupabaseConnection();
                    if (connected) {
                      loadUserDocuments();
                    }
                  }}
                  className="text-alanizGold-600 hover:text-alanizGold-500 text-xs underline"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
