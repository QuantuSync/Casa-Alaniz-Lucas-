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

// Componente del logo
const Logo = () => (
  <NavLink
    to="/"
    className="flex items-center space-x-2 group transition-all duration-300"
  >
    <div className="relative flex items-center">
      <div
        className="w-8 h-8 text-alanizGold-600 group-hover:text-alanizGold-500 
                      transition-colors duration-300 drop-shadow-gold flex items-center justify-center text-xl"
      >
        🛡️
      </div>
      <div
        className="absolute inset-0 bg-alanizGold-600/20 rounded-full scale-0 
                      group-hover:scale-150 transition-transform duration-500 -z-10"
      ></div>
    </div>
    <div className="hidden lg:flex flex-col justify-center">
      <h1
        className="text-xl font-display font-bold text-alanizGold-600 
                     group-hover:text-alanizGold-500 transition-colors duration-300
                     drop-shadow-gold leading-tight mb-0"
      >
        Casa Alaniz
      </h1>
      <p className="text-xs text-alanizGold-600/70 italic leading-none -mt-0.5">
        Memoria Ardet
      </p>
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
      className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 
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

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300
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
            <div className="hidden lg:flex items-center space-x-1">
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
