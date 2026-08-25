# PRO INGEMA S.A.C. — Sitio web corporativo

Sitio web institucional de **PRO INGEMA S.A.C.** (Profesional en Ingeniería,
Geotecnia y Materiales S.A.C.), empresa cusqueña especializada en ingeniería
geotécnica, estudios de suelos, geología, estudios ambientales y laboratorio
de materiales.

## Stack tecnológico

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — tokens de marca definidos en `app/globals.css`
- **Framer Motion** — animaciones de entrada, scroll reveal, contadores
- **Lucide React** — iconografía
- **next/image** — optimización de imágenes

## Requisitos previos

- Node.js 20 o superior
- npm 10 o superior

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

## Estructura del proyecto

```
app/
  layout.tsx            Layout raíz (fuentes, Navbar, Footer, WhatsApp)
  page.tsx               Inicio
  nosotros/               Historia, misión, visión, valores, equipo
  servicios/              Catálogo de servicios de ingeniería
  geotecnia/              Ensayos de campo
  laboratorio/            Laboratorio de suelos, concreto y asfalto
  proyectos/              Portafolio filtrable de proyectos
  clientes/               Clientes institucionales + carrusel
  galeria/                Galería masonry filtrable
  blog/                   Artículos técnicos y noticias
  contacto/               Formulario, WhatsApp, mapa y datos de contacto
  sitemap.ts / robots.ts  SEO técnico

components/
  layout/                 Navbar, Footer, WhatsAppButton
  ui/                     Button, Container, SectionHeading, PageHero,
                          BrandImage (placeholder/foto), Reveal, AnimatedCounter
  home/                   Secciones exclusivas del Inicio
  sections/               Secciones reutilizables entre páginas
                          (CTABanner, ClientsMarquee, ProjectsGrid, MasonryGallery, ContactForm)

lib/
  constants.ts            Datos de la empresa y navegación
  data/                   Contenido estructurado (servicios, ensayos, proyectos,
                          clientes, galería, blog, equipo)
  resolve-image.ts        Resuelve fotos reales vs. placeholder de marca
  utils.ts                Helper `cn` para clases condicionales

public/images/
  README.md               Guía de nombres de archivo por sección para
                          reemplazar los placeholders por fotografías reales
```

## Reemplazo de imágenes

El sitio se entrega con **placeholders de marca** (paneles con degradado,
cuadrícula tipo plano de ingeniería e ícono) en cada lugar donde debe ir una
fotografía real. Para reemplazarlos, sigue la guía en
[`public/images/README.md`](public/images/README.md): basta con colocar el
archivo con el nombre exacto indicado en la subcarpeta correspondiente — no
se requiere tocar código.

## Contenido editable

Todo el contenido textual (servicios, ensayos, proyectos, clientes, galería,
blog, equipo, datos de contacto) vive en `lib/data/*.ts` y `lib/constants.ts`,
separado de los componentes visuales.

## SEO

- Metadata por página (`title`, `description`) vía `export const metadata`.
- `app/sitemap.ts` y `app/robots.ts` generan `/sitemap.xml` y `/robots.txt`.
- Open Graph configurado en `app/layout.tsx`.
- Actualiza `SITE_URL` en `lib/constants.ts` con el dominio final antes de publicar.
