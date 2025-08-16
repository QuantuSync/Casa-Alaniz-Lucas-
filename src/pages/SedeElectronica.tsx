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
  fecha_subida: string; // DATE en BD, lo formateamos en UI
  tamaño: string;
  url_supabase: string;
  created_at: string;
}

interface UserInfo {
  id: string; // DNI
  name: string;
  type?: "admin" | "user";
}

const TABLE = "documentos_usuarios"; // nombre real de la tabla

export default function SedeElectronica() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<DocumentoUsuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // =====================
  // Helpers
  // =====================
  const getLoggedUser = (): UserInfo | null => {
    // Claves usadas en el proyecto
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
  // Carga de documentos (REST)
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
    } catch (err) {
      console.error("Error cargando documentos:", err);
      setError("No se pudieron cargar tus documentos. Inténtalo de nuevo.");
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // Sesión y navegación
  // =====================
  const handleLogout = () => {
    try {
      localStorage.removeItem("alanizAuth");
      localStorage.removeItem("alanizUserId");
      localStorage.removeItem("alanizUserType");
      localStorage.removeItem("alanizUserName");
    } catch (e) {
      // noop
    }
    navigate("/login");
  };

  // =====================
  // Animaciones de entrada y carga inicial
  // =====================
  useEffect(() => {
    // Observer para animaciones (coherente con Historia.tsx)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const toObserve = document.querySelectorAll(".observe-me");
    toObserve.forEach((el) => observer.observe(el));

    const u = getLoggedUser();
    if (!u) {
      navigate("/login");
    } else {
      setUserInfo(u);
      loadUserDocumentsFromSupabase(u.id);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // =====================
  // Render
  // =====================
  return (
    <div className="min-h-screen py-16 overflow-x-hidden">
      <div className="content-container">
        {/* HERO / CABECERA */}
        <section className="text-center mb-16 observe-me opacity-0 translate-y-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 bg-alanizGold-600 rounded-full shadow-lg mb-6"
            aria-hidden
          >
            <span className="text-alanizGreen-950 text-2xl">🏛️</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-alanizGold-600 mb-6">
            Sede Electrónica
          </h1>

          <div className="divider-ornamental"></div>

          <p className="text-lg text-parchment-300 max-w-3xl mx-auto leading-relaxed">
            Accede a tu documentación personal vinculada a tu DNI
            {userInfo?.id ? (
              <span className="text-parchment-200">: {userInfo.id}</span>
            ) : null}
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center">
            <button
              onClick={() => userInfo && loadUserDocumentsFromSupabase(userInfo.id)}
              className="btn-secondary text-sm w-full md:w-auto"
            >
              🔄 Recargar
            </button>

            {userInfo?.type === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="btn-secondary text-sm w-full md:w-auto"
              >
                🛡️ Panel de Administración
              </button>
            )}

            <button
              onClick={handleLogout}
              className="btn-secondary text-sm w-full md:w-auto"
            >
              ⎋ Cerrar sesión
            </button>

            <button onClick={() => navigate('/')} className="btn-secondary text-sm w-full md:w-auto">
              ← Volver
            </button>
          </div>
        </section>

        {/* LISTA DE DOCUMENTOS */}
        <article className="max-w-5xl mx-auto space-y-6 observe-me opacity-0 translate-y-8" style={{ animationDelay: "200ms" }}>
          {/* Estados */}
          {loading && (
            <div className="card-elegant text-center">
              <div className="flex items-center justify-center space-x-2 py-6">
                <div className="w-6 h-6 border-2 border-alanizGold-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-alanizGold-600">Cargando documentos…</span>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="card-elegant">
              <div className="py-4 px-4 rounded-lg bg-red-500/10 text-red-300 border border-red-500/30">
                {error}
              </div>
            </div>
          )}

          {!loading && !error && documents.length === 0 && (
            <div className="card-elegant text-center">
              <div className="text-4xl text-alanizGold-600/30 mb-2">📄</div>
              <p className="text-parchment-400">No hay documentos asociados a tu cuenta por el momento.</p>
            </div>
          )}

          {!loading && !error && documents.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-semibold text-alanizGold-600 mb-2">
                Tus documentos ({documents.length})
              </h2>

              {documents.map((doc) => (
                <div key={doc.id} className="bg-alanizGreen-800/30 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 max-w-full">
                    {/* Izquierda: icono + textos */}
                    <div className="flex items-start md:items-center gap-3 min-w-0">
                      <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-red-400 text-lg" aria-hidden>
                          {doc.tipo === "Recompensas" ? "🏆" : "⚔️"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-alanizGold-600 truncate" title={doc.nombre}>
                          {doc.nombre}
                        </h3>
                        <p className="text-sm text-parchment-400 whitespace-normal break-words">
                          {doc.tipo} • {doc.tamaño} • {formatDate(doc.fecha_subida)}
                        </p>
                      </div>
                    </div>

                    {/* Derecha: acciones */}
                    <div className="md:w-auto w-full">
                      <a
                        href={doc.url_supabase}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-center w-full md:w-auto px-3 py-2 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30 transition-colors"
                      >
                        Ver PDF
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>

        {/* PIE */}
        <div className="text-center mt-16">
          <div className="bg-alanizGreen-800/50 rounded-xl p-6 border border-alanizGold-600/20 backdrop-blur-sm shadow-elegant inline-block">
            <p className="text-parchment-400 text-sm">
              Última actualización: {new Date().toLocaleString("es-ES")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
