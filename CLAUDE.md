# CLAUDE.md — Casa Alaniz

Archivo heráldico familiar de la Casa Alaniz. SPA pública.

## Stack

- **React 18** + **TypeScript** + **Vite 6**
- **Tailwind CSS 3** (paleta propia, ver abajo)
- **react-router-dom 6** (rutas en `src/App.tsx`)
- **lucide-react** para iconos
- **ESLint 9/flat config** + **Prettier**
- Despliegue en **Vercel** (`vercel.json`, SPA rewrite)

> El repositorio git tiene su raíz en esta carpeta (`Casa-Alaniz-Lucas-`).

## Comandos

```bash
npm run dev       # servidor de desarrollo (Vite)
npm run build     # build de producción -> dist/
npm run preview   # previsualizar el build
npm run lint      # ESLint sobre el proyecto
npm run format    # Prettier --write .
```

## Estructura

- `src/main.tsx` — entrada (ErrorBoundary + Suspense + BrowserRouter)
- `src/App.tsx` — rutas y carga lazy de páginas
- `src/components/` — `Navbar`, `Footer`, `Layout`
- `src/pages/` — una página por ruta
- `src/index.css` — Tailwind + estilos base/componentes/utilidades globales
- `src/assets/` — imágenes importadas por los componentes (Vite las hashea)
- `public/` — estáticos servidos tal cual (favicons, robots, `fonts/`…)

## Convenciones

- **Paleta** (`tailwind.config.js`): `alanizGreen` (fondo oscuro, 950 base), `alanizGold` (oro, 600 = `#d4af37`), `parchment` (texto claro).
- **Tipografía**: titulares `font-display`, cuerpo `font-serif` (ver `tailwind.config.js`).
- **Iconos**: usar `lucide-react` en oro (`text-alanizGold-600`); no usar emojis.
- **Badges de icono**: estilo contorno (`border-2 border-alanizGold-600 bg-transparent`), icono en oro.
- **Imágenes en `public/`** se referencian con ruta absoluta (`/fonts/...`, `/images/...`); las de `src/assets/` se importan en el módulo.
- **Formato**: Prettier (`singleQuote`, `printWidth: 100`, `semi`, 2 espacios). Ejecutar `npm run format` antes de commitear.

## Método de trabajo

- Cambios por **fases**; un commit por fase, sin mezclar fases.
- Tras cada fase: `npm run build` debe pasar, luego commit con mensaje claro.
- Fases marcadas "PLAN PRIMERO": presentar plan y esperar aprobación antes de tocar código.
