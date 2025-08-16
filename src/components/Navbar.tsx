import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Configuración de navegación - CON SUBMENÚS
const navigationItems = [
  { path: "/", label: "Inicio", icon: "🏠" },
  { path: "/historia", label: "Historia", icon: "📜" },
  { path: "/simbolos", label: "Símbolos", icon: "⚔️" },
  { path: "/legado", label: "Legado", icon: "👑" },
  {
    path: "/archivo",
    label: "Archivo",
    icon: "📚",
    hasSubmenu: true,
    submenu: [
      { path: "/documentos", label: "Documentos", icon: "📄" },
      { path: "/condecoraciones", label: "Condecoraciones", icon: "🏆" },
      { path: "/dia-casa", label: "Día de la Casa", icon: "🎖️" },
    ]
  },
  { path: "/sede-electronica", label: "Portal", icon: "🏛️" },
  { path: "/contacto", label: "Contacto", icon: "📧" },
  { path: "/login", label: "Miembros", icon: "🛡️" },
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

// Componente de link de navegación simple
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
      font-medium transition-all duration-300 group text-sm
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

// Componente de navegación con submenú desplegable
const DropdownNavItem = ({
  item,
  isOpen,
  onToggle,
  onClose,
}: {
  item: any;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
  const location = useLocation();
  const isSubmenuActive = item.submenu?.some((subitem: any) => location.pathname === subitem.path);
  
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`
          relative flex items-center space-x-2 px-3 py-2 rounded-lg
          font-medium transition-all duration-300 group text-sm
          ${
            isSubmenuActive || isOpen
              ? "text-alanizGold-500 bg-alanizGold-600/10"
              : "text-alanizGold-600/80 hover:text-alanizGold-500 hover:bg-alanizGold-600/5"
          }
        `}
      >
        <span className="text-sm transition-transform duration-300 group-hover:scale-110">
          {item.icon}
        </span>
        <span className="text-sm font-semibold tracking-wide">{item.label}</span>
        <span className={`text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
        {isSubmenuActive && (
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                          w-6 h-0.5 bg-alanizGold-600 rounded-full"
          ></div>
        )}
        <div
          className="absolute inset-0 bg-alanizGold-600/10 rounded-lg scale-0 
                        group-hover:scale-100 transition-transform duration-300 -z-10"
        ></div>
      </button>

      {/* Submenú desplegable */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-alanizGreen-800 border border-alanizGold-600/20 
                        rounded-lg shadow-2xl backdrop-blur-sm z-50 overflow-hidden">
          <div className="py-2">
            {item.submenu.map((subitem: any) => (
              <NavLink
                key={subitem.path}
                to={subitem.path}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200
                  ${
                    isActive
                      ? "text-alanizGold-500 bg-alanizGold-600/20"
                      : "text-alanizGold-600/80 hover:text-alanizGold-500 hover:bg-alanizGold-600/10"
                  }
                `}
              >
                <span className="text-sm">{subitem.icon}</span>
                <span className="font-medium">{subitem.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente del menú móvil
const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setOpenSubmenu(null);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

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
        <nav className="p-6 space-y-2 overflow-y-auto max-h-[calc(100vh-120px)]">
          {navigationItems.map((item) => (
            <div key={item.path}>
              {item.hasSubmenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="w-full flex items-center justify-between space-x-2 px-3 py-2 rounded-lg
                               font-medium transition-all duration-300 group text-sm
                               text-alanizGold-600/80 hover:text-alanizGold-500 hover:bg-alanizGold-600/5"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                    </div>
                    <span className={`text-xs transition-transform duration-300 ${
                      openSubmenu === item.label ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </span>
                  </button>
                  
                  {/* Submenú en móvil */}
                  {openSubmenu === item.label && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subitem) => (
                        <NavLink
                          key={subitem.path}
                          to={subitem.path}
                          onClick={onClose}
                          className={({ isActive }) => `
                            flex items-center space-x-2 px-3 py-2 rounded-lg
                            font-medium transition-all duration-300 text-sm
                            ${
                              isActive
                                ? "text-alanizGold-500 bg-alanizGold-600/10"
                                : "text-alanizGold-600/60 hover:text-alanizGold-500 hover:bg-alanizGold-600/5"
                            }
                          `}
                        >
                          <span className="text-sm">{subitem.icon}</span>
                          <span className="text-sm font-semibold tracking-wide">{subitem.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavItem
                  path={item.path}
                  label={item.label}
                  icon={item.icon}
                  onClick={onClose}
                />
              )}
            </div>
          ))}
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
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

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  // Manejar ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Añadir estilos CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
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
      
      .group:hover .subtle-glow::before {
        animation-duration: 2s;
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
        opacity: 1;
      }
      
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
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
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
                item.hasSubmenu ? (
                  <DropdownNavItem
                    key={item.path}
                    item={item}
                    isOpen={openDropdown === item.label}
                    onToggle={() => toggleDropdown(item.label)}
                    onClose={() => setOpenDropdown(null)}
                  />
                ) : (
                  <NavItem
                    key={item.path}
                    path={item.path}
                    label={item.label}
                    icon={item.icon}
                  />
                )
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
