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

  // Añadir estilos CSS necesarios con paleta unificada elegante
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .card-elegant {
        background: rgba(26, 46, 26, 0.8);
        border: 1px solid rgba(212, 175, 55, 0.2);
        border-radius: 0.75rem;
        padding: 1.5rem;
        backdrop-filter: blur(8px);
        box-shadow: 
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }

      .btn-alaniz {
        background: linear-gradient(135deg, #d4af37, #b8941f);
        color: #0a1a0a;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: 600;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
      }

      .btn-alaniz:hover {
        background: linear-gradient(135deg, #b8941f, #d4af37);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
      }

      .btn-alaniz:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      .btn-secondary {
        background: rgba(212, 175, 55, 0.1);
        color: #d4af37;
        border: 1px solid rgba(212, 175, 55, 0.3);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: 500;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .btn-secondary:hover {
        background: rgba(212, 175, 55, 0.2);
        border-color: rgba(212, 175, 55, 0.5);
      }

      .content-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      @media (min-width: 768px) {
        .content-container {
          padding: 0 2rem;
        }
        
        .card-elegant {
          padding: 2rem;
        }
      }

      /* Paleta unificada elegante */
      .text-alanizGold-600 {
        color: #d4af37;
      }

      .text-alanizGold-500 {
        color: #e6c547;
      }

      .text-alanizGold-400 {
        color: #f0d858;
      }

      .text-parchment-100 {
        color: #f5f3e7;
      }

      .text-parchment-200 {
        color: #e8e4d3;
      }

      .text-parchment-300 {
        color: #dbd5bf;
      }

      .text-parchment-400 {
        color: #cdc5ab;
      }

      .text-parchment-500 {
        color: #b8ad91;
      }

      .text-green-400 {
        color: #4ade80;
      }

      .text-yellow-400 {
        color: #facc15;
      }

      .text-red-400 {
        color: #f87171;
      }

      .text-blue-400 {
        color: #60a5fa;
      }

      /* Verdes elegantes unificados */
      .bg-alanizGreen-950 {
        background-color: #0a1a0a;
      }

      .bg-alanizGreen-900 {
        background-color: #1a2e1a;
      }

      .bg-alanizGreen-800 {
        background-color: #2a3e2a;
      }

      .bg-alanizGold-600 {
        background-color: #d4af37;
      }

      /* Fondos con transparencia elegante */
      .bg-alanizGreen-900-30 {
        background-color: rgba(26, 46, 26, 0.3);
      }

      .bg-alanizGreen-900-50 {
        background-color: rgba(26, 46, 26, 0.5);
      }

      .bg-alanizGreen-800-20 {
        background-color: rgba(42, 62, 42, 0.2);
      }

      .bg-alanizGold-600-20 {
        background-color: rgba(212, 175, 55, 0.2);
      }

      .font-display {
        font-family: 'Playfair Display', serif;
      }

      .animate-spin {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      /* Hover elegante para documentos */
      .document-item {
        background: rgba(26, 46, 26, 0.3);
        border-radius: 0.5rem;
        padding: 0.75rem;
        transition: all 0.3s ease;
      }

      .document-item:hover {
        background: rgba(26, 46, 26, 0.5);
        transform: translateY(-1px);
      }

      @media (min-width: 768px) {
        .document-item {
          padding: 1rem;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

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
          <div className="w-12 h-12 border-2 border-alanizGold-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-alanizGold-600">Cargando documentos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-alanizGreen-950 p-4">
        <div className="text-center space-y-4 max-w-md mx-auto">
          <div className="text-6xl text-red-400 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-400">Error al cargar</h2>
          <p className="text-parchment-300">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
    <div className="min-h-screen bg-alanizGreen-950 py-4 md:py-8">
      <div className="content-container">
        {/* Header */}
        <div className="card-elegant mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 md:mb-6 space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-alanizGold-600 rounded-full flex items-center justify-center mx-auto sm:mx-0">
                <span className="text-alanizGreen-950 text-lg md:text-xl">🏛️</span>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl md:text-2xl font-display font-bold text-alanizGold-600">
                  Sede Electrónica
                </h1>
                <p className="text-parchment-300 text-sm md:text-base">
                  Bienvenido, {userInfo?.name}
                </p>
                <div className="flex items-center justify-center sm:justify-start space-x-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  <span className={`text-xs ${supabaseConnected ? 'text-green-400' : 'text-yellow-400'}`}>
                    {supabaseConnected ? 'Sistema global' : 'Modo local'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => testSupabaseConnection()}
                className="btn-secondary text-sm w-full sm:w-auto"
              >
                🔄 Test
              </button>
              <button onClick={handleLogout} className="btn-secondary w-full sm:w-auto">
                Cerrar Sesión
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-alanizGreen-900-30 rounded-lg p-3 md:p-4 text-center">
              <h3 className="font-semibold text-alanizGold-600 mb-1 md:mb-2 text-sm md:text-base">DNI</h3>
              <p className="text-parchment-300 text-sm md:text-base">{userInfo?.id || "N/A"}</p>
            </div>
            <div className="bg-alanizGreen-900-30 rounded-lg p-3 md:p-4 text-center">
              <h3 className="font-semibold text-alanizGold-600 mb-1 md:mb-2 text-sm md:text-base">Documentos</h3>
              <p className="text-parchment-300 text-sm md:text-base">{documents.length}</p>
            </div>
            <div className="bg-alanizGreen-900-30 rounded-lg p-3 md:p-4 text-center">
              <h3 className="font-semibold text-alanizGold-600 mb-1 md:mb-2 text-sm md:text-base">Estado</h3>
              <p className={`text-sm md:text-base ${supabaseConnected ? "text-green-400" : "text-yellow-400"}`}>
                {supabaseConnected ? 'Global' : 'Local'}
              </p>
            </div>
          </div>
        </div>

        {/* Documentos */}
        <div className="card-elegant">
          <h2 className="text-lg md:text-xl font-display font-bold text-alanizGold-600 mb-4 md:mb-6 text-center">
            Mis Documentos
          </h2>

          {documents.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <div className="text-4xl md:text-6xl text-alanizGold-600/30 mb-4">📄</div>
              <h3 className="text-base md:text-lg font-medium text-alanizGold-600 mb-2">
                No hay documentos disponibles
              </h3>
              <p className="text-parchment-400 text-sm md:text-base px-4">
                Los documentos aparecerán aquí cuando sean asignados por la administración.
              </p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="document-item"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                    <div className="flex items-start md:items-center space-x-3 md:space-x-4 flex-1">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-alanizGold-600-20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-alanizGold-600 text-sm md:text-base">
                          {doc.tipo === "Recompensas" ? "🏆" : 
                           doc.tipo === "Nombramientos" ? "⚔️" : "📄"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-alanizGold-600 text-sm md:text-base break-words">
                          {doc.nombre}
                        </h3>
                        <p className="text-xs md:text-sm text-parchment-400 break-words">
                          {doc.tipo} • {doc.tamaño} • {doc.fecha_subida}
                        </p>
                        <p className="text-xs text-parchment-500">
                          {doc.url_supabase?.includes('supabase') ? '☁️ Global' : '💾 Local'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
                      <button
                        onClick={() => handleViewDocument(doc)}
                        className="btn-secondary text-sm w-full sm:w-auto"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="btn-alaniz text-sm w-full sm:w-auto"
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
        <div className="card-elegant mt-6 md:mt-8">
          <h3 className="font-semibold text-alanizGold-600 mb-3 md:mb-4 text-center text-base md:text-lg">
            Información Importante
          </h3>
          <div className="bg-alanizGreen-900-30 rounded-lg p-3 md:p-4">
            <ul className="space-y-2 text-parchment-300 text-xs md:text-sm">
              <li>• Los documentos están firmados digitalmente por la Casa Alaniz</li>
              <li>• Mantén tus credenciales seguras y no las compartas</li>
              <li>• Para solicitar nuevos documentos, contacta con la administración</li>
              <li>• Los documentos tienen validez oficial para trámites genealógicos</li>
              <li>• {supabaseConnected ? 'Sistema sincronizado globalmente' : 'Modo offline - documentos locales'}</li>
            </ul>
          </div>

          {/* Información técnica */}
          <div className="mt-3 md:mt-4 p-2 md:p-3 bg-alanizGreen-800-20 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs space-y-2 sm:space-y-0">
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
