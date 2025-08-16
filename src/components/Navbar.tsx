import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Configuración de navegación - REORGANIZADA EN DOS NIVELES
const primaryNavigation = [
  { path: "/", label: "Inicio", icon: "🏠" },
  { path: "/historia", label: "Historia", icon: "📜" },
  { path: "/simbolos", label: "Símbolos", icon: "⚔️" },
  { path: "/legado", label: "Legado", icon: "👑" },
  { path: "/contacto", label: "Contacto", icon: "📧" },
  { path: "/login", label: "Miembros", icon: "🛡️" },
] as const;

const secondaryNavigation = [
  { path: "/documentos", label: "Documentos", icon: "📚" },
  { path: "/condecoraciones", label: "Condecoraciones", icon: "🏆" },
  { path: "/dia-casa", label: "Día de la Casa", icon: "🎖️" },
  { path: "/sede-electronica", label: "Sede Electrónica", icon: "🏛️" },
] as const;

// Componente del logo
const Logo = () => (
  <NavLink
    to="/"
    className="flex items-center space-x-3 group transition-all duration-300"
  >
    <div className="relative flex items-center">
      <div
        className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 
                   drop-shadow-lg flex items-center justify-center subtle-glow"
      >
        <img 
          src="/SelloSinFondo.ico" 
          alt="Escudo Casa Alaniz" 
          className="w-full h-full object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300"
        />
      </div>
    </div>
    <div className="hidden lg:flex items-center relative">
      <h1
        className="text-xl font-display font-semibold text-alanizGold-600 
                   group-hover:text-alanizGold-500 transition-colors duration-300
                   drop-shadow-gold relative leading-none"
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
  isSecondary = false,
}: {
  path: string;
  label: string;
  icon: string;
  onClick?: () => void;
  isSecondary?: boolean;
}) => (
  <NavLink
    to={path}
    onClick={onClick}
    className={({ isActive }) => `
      relative flex items-center space-x-2 px-3 py-2 rounded-lg
      font-medium transition-all duration-300 group
      ${isSecondary ? 'text-xs' : 'text-sm'}
      ${
        isActive
          ? "text-alanizGold-500 bg-alanizGold-600/10"
          : "text-alanizGold-600/80 hover:text-alanizGold-500 hover:bg-alanizGold-600/5"
      }
    `}
  >
    {({ isActive }) => (
      <>
        <span className={`transition-transform duration-300 group-hover:scale-110 ${
          isSecondary ? 'text-xs' : 'text-sm'
        }`}>
          {icon}
        </span>
        <span className={`font-semibold tracking-wide ${
          isSecondary ? 'text-xs' : 'text-sm'
        }`}>{label}</span>
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
        <nav className="p-6 space-y-6">
          {/* Primary Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-alanizGold-600/60 uppercase tracking-wider mb-3">
              Navegación Principal
            </h3>
            <div className="space-y-2">
              {primaryNavigation.map((item) => (
                <NavItem
                  key={item.path}
                  path={item.path}
                  label={item.label}
                  icon={item.icon}
                  onClick={onClose}
                />
              ))}
            </div>
          </div>

          {/* Secondary Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-alanizGold-600/60 uppercase tracking-wider mb-3">
              Archivo & Ceremonias
            </h3>
            <div className="space-y-2">
              {secondaryNavigation.map((item) => (
                <NavItem
                  key={item.path}
                  path={item.path}
                  label={item.label}
                  icon={item.icon}
                  onClick={onClose}
                />
              ))}
            </div>
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
      /* Efecto brillo sutil para la imagen */
      .subtle-glow {
        position: relative;
        overflow: visible;
      }
      
      .subtle-glow::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: none;
        box-shadow: 0 0 8px rgba(212, 175, 55, 0.2);
        border-radius: 50%;
        opacity: 0.7;
        animation: subtleGlow 4s ease-in-out infinite;
        z-index: -1;
        pointer-events: none;
      }
      
      @keyframes subtleGlow {
        0%, 100% { 
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.2);
          opacity: 0.7;
        }
        50% { 
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.3);
          opacity: 1;
        }
      }
      
      /* Efecto al hacer hover */
      .group:hover .subtle-glow::before {
        animation-duration: 2s;
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
        opacity: 1;
      }
      
      /* Para pantallas móviles */
      @media (max-width: 1024px) {
        .subtle-glow::before {
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          box-shadow: 0 0 6px rgba(212, 175, 55, 0.15);
        }
        
        .group:hover .subtle-glow::before {
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
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
          {/* Navbar principal */}
          <nav className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation - Primary Level - CENTRADO */}
            <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {primaryNavigation.map((item) => (
                <NavItem
                  key={item.path}
                  path={item.path}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </div>

            {/* Espacio vacío para mantener el logo centrado */}
            <div className="hidden lg:block w-32"></div>

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

          {/* Secondary Navigation Bar */}
          <div className="hidden lg:block border-t border-alanizGold-600/10">
            <nav className="flex items-center justify-center py-2">
              <div className="flex items-center space-x-1">
                {secondaryNavigation.map((item) => (
                  <NavItem
                    key={item.path}
                    path={item.path}
                    label={item.label}
                    icon={item.icon}
                    isSecondary={true}
                  />
                ))}
              </div>
            </nav>
          </div>
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
