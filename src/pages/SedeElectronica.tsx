import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// =====================
// CONFIGURACIÓN SUPABASE (usa variables de entorno en producción)
// =====================
const SUPABASE_URL = "https://rbicywnjsbrbezomrnss.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiaWN5d25qc2JyYmV6b21ybnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MjE5MDgsImV4cCI6MjA3MDQ5NzkwOH0.eVW1XGZVFmQa49-Ai2rwqSXbMdthqHHRZsCpOU3k6bw";

// =====================
// Tipados
// =====================
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

interface UserInfo {
  id: string; // en tu app suele ser el DNI
  name: string;
  type?: "admin" | "user";
}

// Nombre real de la tabla (según tu AdminPanel): documentos_usuarios
const TABLE = "documentos_usuarios";

export default function SedeElectronica() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<DocumentoUsuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // =====================
  // Utilidades
  // =====================
  const getLoggedUser = (): UserInfo | null => {
    // AdminPanel usa estos keys: alanizUserId (DNI), alanizUserName, alanizUserType, alanizAuth
    const isAuth = localStorage.getItem("alanizAuth");
    const id = localStorage.getItem("alanizUserId") || ""; // DNI
    const name = localStorage.getItem("alanizUserName") || "";
    const type = (localStorage.getItem("alanizUserType") as "admin" | "user" | null) || undefined;

    if (!isAuth || !id) return null;
    return { id, name, type };
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  // =====================
  // Carga de documentos desde Supabase (REST)
  // =====================
  const loadUserDocumentsFromSupabase = async (userDni: string) => {
    setLoading(true);
    setError("");

    try {
      const url = `${SUPABASE_URL}/rest/v1/${TABLE}?usuario_dni=eq.${encodeURIComponent(
        userDni
      )}&select=*&order=created_at.desc`;

      const response = await fetch(url, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Error al cargar documentos desde Supabase");
      }

      const data: DocumentoUsuario[] = await response.json();
      setDocuments(data);
    } catch (err: any) {
      console.error("Error cargando documentos:", err);
      setError("No se pudieron cargar tus documentos. Inténtalo de nuevo.");
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // Efecto inicial: obtener usuario y cargar documentos
  // =====================
  useEffect(() => {
    const u = getLoggedUser();
    if (!u) {
      // No hay sesión válida
      navigate("/login");
      return;
    }
    setUserInfo(u);
    loadUserDocumentsFromSupabase(u.id);
  }, [navigate]);

  // =====================
  // Render
  // =====================
  return (
    <div className="min-h-screen bg-alanizGreen-950 py-8">
      <div className="content-container">
        {/* Header */}
        <div className="card-elegant mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-alanizGold-600 rounded-full flex items-center justify-center">
                <span className="text-alanizGreen-950 text-xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-alanizGold-600">
                  Sede Electrónica
                </h1>
                <p className="text-parchment-300">
                  Documentación personal vinculada a tu DNI
                  {userInfo?.id ? `: ${userInfo.id}` : ""}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => userInfo && loadUserDocumentsFromSupabase(userInfo.id)}
                className="btn-secondary text-sm"
              >
                🔄 Recargar
              </button>
              <button
                onClick={() => navigate("/")}
                className="btn-secondary text-sm"
              >
                ← Volver
              </button>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="card-elegant">
          {loading && (
            <div className="py-8 text-center text-parchment-300">Cargando documentos…</div>
          )}

          {!loading && error && (
            <div className="py-6 px-4 mb-4 rounded-lg bg-red-500/10 text-red-300 border border-red-500/30">
              {error}
            </div>
          )}

          {!loading && !error && documents.length === 0 && (
            <div className="py-10 text-center">
              <div className="text-4xl text-alanizGold-600/30 mb-2">📄</div>
              <p className="text-parchment-400">No hay documentos asociados a tu cuenta por el momento.</p>
            </div>
          )}

          {!loading && !error && documents.length > 0 && (
            <div>
              <h2 className="text-xl font-display font-bold text-alanizGold-600 mb-4">
                Tus documentos ({documents.length})
              </h2>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-alanizGreen-800/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-500/20 rounded flex items-center justify-center">
                          <span className="text-red-400 text-sm">
                            {doc.tipo === "Recompensas" ? "🏆" : "⚔️"}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-alanizGold-600">{doc.nombre}</h3>
                          <p className="text-sm text-parchment-400">
                            {doc.tipo} • {doc.tamaño} • {formatDate(doc.fecha_subida)}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={doc.url_supabase}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30 transition-colors"
                        >
                          Ver PDF
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pie */}
        <div className="mt-8 text-center text-parchment-400 text-sm">
          Última actualización: {new Date().toLocaleString("es-ES")}
        </div>
      </div>
    </div>
  );
}
