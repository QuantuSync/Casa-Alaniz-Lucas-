import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Configuración de navegación - AÑADIDA "Condecoraciones"
const navigationItems = [
  { path: "/", label: "Inicio", icon: "🏠" },
  { path: "/historia", label: "Historia", icon: "📜" },
  { path: "/simbolos", label: "Símbolos", icon: "⚔️" },
  { path: "/legado", label: "Legado", icon: "👑" },
  { path: "/documentos", label: "Documentos", icon: "📚" },
  { path: "/condecoraciones", label: "Condecoraciones", icon: "🏆" },
  { path: "/sede-electronica", label: "Sede Electrónica", icon: "🏛️" },
  { path: "/contacto", label: "Contacto", icon: "📧" },
  { path: "/login", label: "Miembros", icon: "🛡️" },
] as const;

// Componente del logo con efecto de partículas
const Logo = () => (
  <NavLink
    to="/"
    className="flex items-center space-x-3 group transition-all duration-300"
  >
    <div className="relative flex items-center">
      <div
        className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 
                   drop-shadow-lg flex items-center justify-center treasure-glow"
      >
        <img 
          src="/SelloSinFondo.ico" 
          alt="Escudo Casa Alaniz" 
          className="w-full h-full object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300"
        />
      </div>
    </div>
    <div className="hidden lg:flex items-center relative logo-text-container">
      <h1
        className="text-xl font-display font-semibold text-alanizGold-600 
                   group-hover:text-alanizGold-500 transition-colors duration-300
                   drop-shadow-gold relative particles-text leading-none"
        style={{ height: '40px', display: 'flex', alignItems: 'center' }}
      >
        Casa Alaniz
      </h1>
    </div>
  </NavLink>
);

// Componente de link de navegación
const NavItem = ({
  path,
  label,
  icon,
  onClick,
}: {
  path: string;
  label: string;
  icon: string;
  onClick?: () => void;
}) => (
  <NavLink
    to={path}
    onClick={onClick}
    className={({ isActive }) => `
      relative flex items-center space-x-2 px-3 py-2 rounded-lg
      font-medium transition-all duration-300 group
      ${
        isActive
          ? "text-alanizGold-500 bg-alanizGold-600/10"
          : "text-alanizGold-600/80 hover:text-alanizGold-500 hover:bg-alanizGold-600/5"
      }
    `}
  >
    {({ isActive }) => (
      <>
        <span className="text-sm transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
        <span className="text-sm font-semibold tracking-wide">{label}</span>
        {isActive && (
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                          w-6 h-0.5 bg-alanizGold-600 rounded-full"
          ></div>
        )}
        <div
          className="absolute inset-0 bg-alanizGold-600/10 rounded-lg scale-0 
                        group-hover:scale-100 transition-transform duration-300 -z-10"
        ></div>
      </>
    )}
  </NavLink>
);

// Componente del menú móvil
const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[99999] lg:hidden transition-opacity duration-300 
                     ${
                       isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                     }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-alanizGreen-950/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Menu panel */}
      <div
        className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] 
                       bg-gradient-to-b from-alanizGreen-800 to-alanizGreen-900
                       border-l border-alanizGold-600/20 shadow-2xl
                       transform transition-transform duration-300 ease-out
                       ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-alanizGold-600/20">
          <Logo />
          <button
            onClick={onClose}
            className="p-2 text-alanizGold-600 hover:text-alanizGold-500 
                       hover:bg-alanizGold-600/10 rounded-lg transition-all duration-200"
          >
            <span className="block w-6 h-6 text-xl">✕</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <NavItem
                key={item.path}
                path={item.path}
                label={item.label}
                icon={item.icon}
                onClick={onClose}
              />
            ))}
          </div>
        </nav>

        {/* Footer info */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 
                        border-t border-alanizGold-600/20"
        >
          <p className="text-xs text-alanizGold-600/60 text-center italic">
            Custodios de la memoria familiar desde 1117
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente principal del Navbar
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Efecto de scroll para el navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Manejar ESC key para cerrar menú móvil
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isMobileMenuOpen]);

  // Añadir estilos CSS para las partículas
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap');
      
      .particles-text {
        font-family: 'EB Garamond', serif !important;
        position: relative;
        text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        white-space: nowrap;
      }
      
      /* Partícula 1 - Arriba izquierda */
      .particles-text::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #ffd700 0%, #d4af37 50%, transparent 100%);
        border-radius: 50%;
        box-shadow: 
          0 0 6px #ffd700,
          0 0 12px rgba(255, 215, 0, 0.6);
        pointer-events: none;
        z-index: 10;
        top: -10px;
        left: 10%;
        animation: orbit1 5s linear infinite;
      }
      
      /* Partícula 2 - Arriba derecha */
      .particles-text::after {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #ffd700 0%, #d4af37 50%, transparent 100%);
        border-radius: 50%;
        box-shadow: 
          0 0 6px #ffd700,
          0 0 12px rgba(255, 215, 0, 0.6);
        pointer-events: none;
        z-index: 10;
        top: -10px;
        right: 10%;
        animation: orbit2 7s linear infinite reverse;
      }
      
      /* Partículas adicionales SOLO para el contenedor del logo */
      .logo-text-container::before {
        content: '';
        position: absolute;
        width: 3px;
        height: 3px;
        background: radial-gradient(circle, #ffd700 0%, #d4af37 50%, transparent 100%);
        border-radius: 50%;
        box-shadow: 
          0 0 4px #ffd700,
          0 0 8px rgba(255, 215, 0, 0.5);
        pointer-events: none;
        z-index: 10;
        left: -10px;
        top: 50%;
        transform: translateY(-50%);
        animation: orbit3 6s ease-in-out infinite;
        opacity: 0.8;
      }
      
      .logo-text-container::after {
        content: '';
        position: absolute;
        width: 3px;
        height: 3px;
        background: radial-gradient(circle, #ffd700 0%, #d4af37 50%, transparent 100%);
        border-radius: 50%;
        box-shadow: 
          0 0 4px #ffd700,
          0 0 8px rgba(255, 215, 0, 0.5);
        pointer-events: none;
        z-index: 10;
        right: -15px;
        top: 30%;
        animation: orbit4 4s ease-in-out infinite reverse;
        opacity: 0.7;
      }
      
      /* Efecto resplandor para la imagen */
      .treasure-glow {
        position: relative;
        overflow: visible;
      }
      
      .treasure-glow::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        background: none;
        border: 2px solid rgba(255, 215, 0, 0.4);
        border-radius: 50%;
        filter: blur(2px);
        animation: glowPulse 3s ease-in-out infinite;
        z-index: -1;
      }
      
      .treasure-glow::after {
        content: '';
        position: absolute;
        top: -6px;
        left: -6px;
        right: -6px;
        bottom: -6px;
        background: none;
        box-shadow: 
          0 0 10px rgba(255, 215, 0, 0.3),
          0 0 20px rgba(255, 215, 0, 0.2),
          0 0 30px rgba(255, 215, 0, 0.1);
        border-radius: 50%;
        animation: outerGlow 4s ease-in-out infinite;
        z-index: -2;
        pointer-events: none;
      }
      
      @keyframes glowPulse {
        0%, 100% { 
          border-color: rgba(255, 215, 0, 0.3);
          transform: scale(1);
        }
        50% { 
          border-color: rgba(255, 215, 0, 0.6);
          transform: scale(1.1);
        }
      }
      
      @keyframes outerGlow {
        0%, 100% { 
          box-shadow: 
            0 0 10px rgba(255, 215, 0, 0.2),
            0 0 20px rgba(255, 215, 0, 0.1),
            0 0 30px rgba(255, 215, 0, 0.05);
        }
        50% { 
          box-shadow: 
            0 0 15px rgba(255, 215, 0, 0.4),
            0 0 30px rgba(255, 215, 0, 0.3),
            0 0 45px rgba(255, 215, 0, 0.2);
        }
      }
      
      /* Animaciones de órbitas para las partículas */
      @keyframes orbit1 {
        0% { 
          transform: rotate(0deg) translateX(50px) rotate(0deg) scale(0.8);
          opacity: 0;
        }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { 
          transform: rotate(360deg) translateX(50px) rotate(-360deg) scale(1.2);
          opacity: 0;
        }
      }
      
      @keyframes orbit2 {
        0% { 
          transform: rotate(0deg) translateX(45px) rotate(0deg) scale(1);
          opacity: 0;
        }
        15% { opacity: 1; }
        85% { opacity: 1; }
        100% { 
          transform: rotate(-360deg) translateX(45px) rotate(360deg) scale(0.6);
          opacity: 0;
        }
      }
      
      @keyframes orbit3 {
        0%, 100% { 
          transform: translateY(-50%) translateX(0px) scale(0.8);
          opacity: 0.6;
        }
        33% { 
          transform: translateY(-70%) translateX(15px) scale(1.1);
          opacity: 1;
        }
        66% { 
          transform: translateY(-30%) translateX(-10px) scale(0.9);
          opacity: 0.8;
        }
      }
      
      @keyframes orbit4 {
        0%, 100% { 
          transform: translateY(0px) translateX(0px) scale(0.9);
          opacity: 0.5;
        }
        50% { 
          transform: translateY(-25px) translateX(15px) scale(1.2);
          opacity: 1;
        }
      }
      
      /* Efectos al hacer hover SOLO en el grupo del logo */
      .group:hover .particles-text::before {
        animation-duration: 3s;
        box-shadow: 
          0 0 8px #ffd700,
          0 0 16px rgba(255, 215, 0, 0.8);
      }
      
      .group:hover .particles-text::after {
        animation-duration: 4s;
        box-shadow: 
          0 0 8px #ffd700,
          0 0 16px rgba(255, 215, 0, 0.8);
      }
      
      .group:hover .logo-text-container::before {
        animation-duration: 3s;
        transform: translateY(-50%) scale(1.3);
      }
      
      .group:hover .logo-text-container::after {
        animation-duration: 2s;
        transform: scale(1.3);
      }
      
      .group:hover .treasure-glow::before {
        animation-duration: 2s;
        border-color: rgba(255, 215, 0, 0.8);
        transform: scale(1.2);
      }
      
      .group:hover .treasure-glow::after {
        animation-duration: 2.5s;
        box-shadow: 
          0 0 20px rgba(255, 215, 0, 0.5),
          0 0 40px rgba(255, 215, 0, 0.4),
          0 0 60px rgba(255, 215, 0, 0.3);
      }
      
      /* Para pantallas móviles */
      @media (max-width: 1024px) {
        .particles-text::before,
        .particles-text::after {
          width: 3px;
          height: 3px;
        }
        
        .logo-text-container::before,
        .logo-text-container::after {
          width: 2px;
          height: 2px;
        }
        
        .logo-text-container::before {
          left: -8px;
        }
        
        .logo-text-container::after {
          right: -10px;
        }
        
        @keyframes orbit1 {
          0% { 
            transform: rotate(0deg) translateX(30px) rotate(0deg) scale(0.6);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: rotate(360deg) translateX(30px) rotate(-360deg) scale(1);
            opacity: 0;
          }
        }
        
        @keyframes orbit2 {
          0% { 
            transform: rotate(0deg) translateX(25px) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { 
            transform: rotate(-360deg) translateX(25px) rotate(360deg) scale(0.4);
            opacity: 0;
          }
        }
        
        .treasure-glow::before {
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-[99998] transition-all duration-300
                    ${
                      isScrolled
                        ? "bg-alanizGreen-950/95 backdrop-blur-md shadow-lg border-b border-alanizGold-600/20"
                        : "bg-alanizGreen-950/90 backdrop-blur-sm"
                    }`}
      >
        <div className="content-container">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 ml-12">
              {navigationItems.map((item) => (
                <NavItem
                  key={item.path}
                  path={item.path}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-alanizGold-600 hover:text-alanizGold-500
                         hover:bg-alanizGold-600/10 rounded-lg transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-alanizGold-600 focus:ring-opacity-50"
              aria-label="Abrir menú de navegación"
            >
              <span className="block w-6 h-6 text-xl">☰</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
