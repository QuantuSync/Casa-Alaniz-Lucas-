# CLAUDE.md — Casa Alaniz

Archivo heráldico familiar de la Casa Alaniz. Sitio público **pre-renderizado (SSG)**.

## Stack

- **React 18** + **TypeScript** + **Vite 6**
- **vite-react-ssg** — pre-render de un HTML por ruta en el build (SEO/SSR), hidratación en cliente
- **Tailwind CSS 3** (paleta propia, ver abajo)
- **react-router-dom 6** (rutas data-router en `src/App.tsx`)
- **lucide-react** para iconos
- **ESLint 9/flat config** + **Prettier**
- Despliegue en **Vercel** (`vercel.json`; los HTML por ruta se sirven estáticos, el rewrite a `/index.html` es solo fallback SPA)

> El repositorio git tiene su raíz en esta carpeta (`Casa-Alaniz-Lucas-`).

## Comandos

```bash
npm run dev       # servidor de desarrollo (Vite)
npm run build     # build SSG (vite-react-ssg) -> dist/ con un index.html por ruta
npm run preview   # previsualizar el build
npm run lint      # ESLint sobre el proyecto
npm run format    # Prettier --write .
```

## Estructura

- `src/main.tsx` — entry de vite-react-ssg (exporta `createRoot`); SW/preloads guardados para cliente
- `src/App.tsx` — `routes` (data-router) con carga `lazy`, `Root` (ErrorBoundary + Layout + Outlet), `RouteHead` (title/meta por ruta vía `<Head>`) y splash de bienvenida `WelcomeSplash` como overlay `ClientOnly`
- `src/components/` — `Navbar`, `Footer`, `Layout`, `ErrorBoundary`
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
- **Pre-render (SSG)**: el código que use `window`/`document`/`localStorage`/observers debe ir en `useEffect` o handlers (no se ejecutan en build), o envuelto en `<ClientOnly>`. Nada que toque el navegador en el cuerpo del render ni a nivel de módulo, o romperá el build. Título/meta por ruta van en el `handle` de la ruta (→ `RouteHead`/`<Head>`), no en `document.title`.

## Método de trabajo

- Cambios por **fases**; un commit por fase, sin mezclar fases.
- Tras cada fase: `npm run build` debe pasar, luego commit con mensaje claro.
- Fases marcadas "PLAN PRIMERO": presentar plan y esperar aprobación antes de tocar código.
