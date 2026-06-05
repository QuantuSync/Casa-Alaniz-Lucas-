import React from 'react';
import { Mail, MapPin, Calendar, Shield, ArrowUp } from 'lucide-react';

// Componente de información de contacto
const ContactInfo = () => (
  <div className="space-y-3">
    <h3 className="text-lg font-display font-semibold text-alanizGold-600 mb-4">
      Contacto Oficial
    </h3>

    <div className="flex items-center space-x-3 text-sm text-parchment-300">
      <Mail className="w-4 h-4 text-alanizGold-600 flex-shrink-0" aria-hidden="true" />
      <a
        href="/contacto"
        className="hover:text-alanizGold-600 transition-colors duration-200 underline-offset-2 hover:underline"
      >
        Formulario de contacto
      </a>
    </div>

    <div className="flex items-center space-x-3 text-sm text-parchment-300">
      <MapPin className="w-4 h-4 text-alanizGold-600 flex-shrink-0" aria-hidden="true" />
      <span>Archivo Heráldico, Castilla y León, España</span>
    </div>

    <div className="flex items-center space-x-3 text-sm text-parchment-300">
      <Calendar className="w-4 h-4 text-alanizGold-600 flex-shrink-0" aria-hidden="true" />
      <span>Fundada en 1117 d.C.</span>
    </div>
  </div>
);

// Componente de enlaces rápidos
const QuickLinks = () => {
  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/historia', label: 'Nuestra Historia' },
    { href: '/simbolos', label: 'Símbolos Heráldicos' },
    { href: '/legado', label: 'El Legado' },
    { href: '/documentos', label: 'Archivo Documental' },
    { href: '/contacto', label: 'Contactar' },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-display font-semibold text-alanizGold-600 mb-4">Navegación</h3>
      <nav className="grid grid-cols-2 gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-parchment-300 hover:text-alanizGold-600 
                       transition-colors duration-200 underline-offset-2 hover:underline
                       block py-1"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

// Componente de información de la casa
const HouseInfo = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3 mb-4">
      <Shield className="h-6 w-6 shrink-0 text-alanizGold-600" aria-hidden="true" />
      <h3 className="m-0 text-lg font-display font-semibold leading-none text-alanizGold-600">
        Casa Alaniz
      </h3>
    </div>

    <p className="text-sm text-parchment-300 leading-relaxed mb-4">
      Custodios de la memoria y preservadores del legado familiar desde el siglo XII. Nuestro
      archivo heráldico mantiene viva la historia y tradiciones de la Casa Alaniz.
    </p>

    <div className="bg-alanizGreen-800/50 rounded-lg p-4 border border-alanizGold-600/20">
      <p className="text-sm text-alanizGold-600 font-medium italic text-center">"Memoria Ardet"</p>
      <p className="text-xs text-parchment-400 text-center mt-1">
        La memoria arde - Lema de la Casa Alaniz
      </p>
    </div>
  </div>
);

// Componente principal del Footer
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-gradient-to-t from-alanizGreen-950 via-alanizGreen-900 to-alanizGreen-800 
                      border-t border-alanizGold-600/20"
    >
      {/* Patrón decorativo superior */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r 
                      from-transparent via-alanizGold-600 to-transparent opacity-50"
      ></div>

      <div className="content-container">
        {/* Contenido principal del footer */}
        <div className="py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Información de la Casa */}
            <div>
              <HouseInfo />
            </div>

            {/* Enlaces rápidos */}
            <div>
              <QuickLinks />
            </div>

            {/* Información de contacto */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>

        {/* Footer inferior */}
        <div className="border-t border-alanizGold-600/15 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright y año */}
            <div className="text-center md:text-left">
              <p className="text-sm text-parchment-300">
                © {currentYear} Casa Alaniz —
                <span className="italic text-alanizGold-600 ml-1">Memoria Ardet</span>
              </p>
              <p className="text-xs text-parchment-400 mt-1">
                Todos los derechos reservados. Archivo Heráldico Familiar.
              </p>
            </div>

            {/* Enlaces legales */}
            <div className="flex items-center space-x-6 text-xs text-parchment-400">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-alanizGold-600 transition-colors duration-200 
                           underline-offset-2 hover:underline"
              >
                <span className="inline-flex items-center gap-1">
                  Subir <ArrowUp className="w-3 h-3" aria-hidden="true" />
                </span>
              </button>
              <a
                href="/contacto"
                className="hover:text-alanizGold-600 transition-colors duration-200
                           underline-offset-2 hover:underline"
              >
                Aviso Legal
              </a>
              <a
                href="/contacto"
                className="hover:text-alanizGold-600 transition-colors duration-200
                           underline-offset-2 hover:underline"
              >
                Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos de fondo */}
      <div
        className="absolute bottom-0 left-1/4 w-32 h-32 bg-alanizGold-600/5 
                      rounded-full blur-2xl -z-10"
      ></div>
      <div
        className="absolute bottom-0 right-1/4 w-48 h-48 bg-alanizGold-600/3 
                      rounded-full blur-3xl -z-10"
      ></div>
    </footer>
  );
}
