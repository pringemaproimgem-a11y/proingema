# Rediseño web de PRO INGEMA S.A.C.

**Fecha:** 3 de agosto de 2026  
**Estado:** Aprobado para planificación  
**Referencia visual:** Diseño oscuro mostrado por el usuario y conservado en `docs/superpowers/specs/assets/pro-ingema-approved-reference.png`

## Objetivo

Rediseñar el sitio existente de PRO INGEMA S.A.C. usando como autoridad visual la portada oscura seleccionada por el usuario. El sitio debe integrar el logotipo, las fotografías y el contenido técnico de `D:\niki\contexto`, mantener la identidad verde y naranja de la empresa y mejorar la claridad comercial, la credibilidad y la experiencia móvil sin cambiar el carácter del diseño aprobado.

## Alcance

El rediseño cubre la portada y las rutas existentes:

- `/`
- `/nosotros`
- `/servicios`
- `/geotecnia`
- `/laboratorio`
- `/proyectos`
- `/clientes`
- `/galeria`
- `/blog`
- `/contacto`

No se añadirá un CMS, autenticación, pagos, panel administrativo ni integraciones externas nuevas. La prioridad es completar un sitio corporativo coherente, rápido y fácil de mantener con el stack actual.

## Fuente de verdad del contenido

La implementación usará material real de `D:\niki\contexto`:

- `logo-proingema.png` como logotipo corporativo.
- `SERVICIOS REALIZ.docx` para ingeniería geotécnica, diseños especiales y geofísica.
- `LAB.SUELOS Y CON.docx` para el catálogo de ensayos de suelos, agregados, concreto, mortero y trabajos de campo.
- `Servicios _ ambiental .docx` para monitoreo ambiental, IGA, biodiversidad, residuos, formalización minera, gestión social y asesoría legal predial.
- Fotografías de diseño de mezcla, esclerometría, SPT, densidad de campo, geofísica y exploración mediante calicatas.

Se conservarán los datos corporativos ya definidos en `lib/constants.ts` cuando no contradigan el material entregado. No se inventarán clientes, certificaciones, cifras, proyectos ni resultados. Las afirmaciones técnicas se redactarán de forma concreta y verificable.

## Dirección visual aprobada

### Identidad

- Fondo principal carbón oscuro, nunca negro puro.
- Verde brillante como acento primario para titulares, indicadores, botones y focos de interacción.
- Naranja como acento secundario reservado para etiquetas pequeñas y detalles de marca.
- Blanco cálido y grises neutros para texto y superficies.
- Cuadrícula técnica y puntos luminosos sutiles como textura de fondo.
- Fotografías reales tratadas con overlays oscuros para asegurar contraste y coherencia.

### Tipografía

- `Space Grotesk` para titulares y números destacados.
- `Inter` para navegación, texto y controles.
- Titulares grandes, compactos y con `text-wrap: balance`.
- Párrafos limitados a una medida legible cercana a 60–65 caracteres.
- Etiquetas técnicas con tracking amplio y uso moderado de mayúsculas.

### Movimiento

- Entrada inicial breve del hero mediante opacidad y desplazamiento vertical.
- Revelados al hacer scroll solo cuando aporten jerarquía.
- Estados hover y pressed en botones, enlaces, tarjetas y menú.
- Transformaciones y opacidad para mantener animaciones fluidas.
- Respeto a `prefers-reduced-motion`; el contenido debe permanecer visible sin animación.

## Arquitectura de experiencia

### Navegación global

El encabezado se mantendrá compacto y superpuesto sobre fondos oscuros. Usará el logotipo real y un botón de menú claramente visible. El menú abrirá un panel de navegación accesible con todas las rutas actuales, contacto directo y CTA de cotización. La página activa tendrá un indicador visual.

### Portada

La portada conservará la composición del diseño aprobado:

1. Hero de altura dominante con fotografía real de trabajo en campo.
2. Etiqueta “Ingeniería geotécnica desde 2011”.
3. Titular principal con una frase destacada en verde.
4. Resumen específico de capacidades.
5. CTA principal “Solicitar cotización” y CTA secundario “Ver servicios”.
6. Señales de confianza verificables y acceso rápido a las áreas técnicas.
7. Sección de servicios organizada de forma asimétrica, evitando una cuadrícula genérica de tarjetas iguales.
8. Evidencia visual de proyectos y trabajo en campo.
9. Bloque de laboratorio con acceso al catálogo de ensayos.
10. Presentación de servicios ambientales y geofísicos.
11. Proceso de trabajo desde la consulta hasta el informe técnico.
12. CTA final y pie de página corporativo.

### Páginas internas

Cada ruta interna reutilizará la misma identidad mediante:

- Hero corto con fotografía y título contextual.
- Navegación secundaria o índice cuando el contenido sea extenso.
- Jerarquía clara de secciones y listas técnicas.
- Fotografías reales relacionadas con el servicio.
- CTA contextual hacia contacto o WhatsApp.
- Navegación de retorno para evitar páginas sin salida.

Las páginas de servicios, geotecnia y laboratorio priorizarán el detalle técnico. Nosotros y proyectos priorizarán credibilidad y experiencia. Galería dará protagonismo a las fotografías reales. Contacto reducirá fricción para solicitar una cotización.

## Componentes y datos

- `Navbar` controlará el encabezado, el menú accesible y el estado de ruta activa.
- `Footer` mostrará logotipo, contacto, navegación esencial y datos legales existentes.
- `Hero` compondrá fotografía, overlays, etiqueta, titular y CTA.
- Los componentes de servicios consumirán datos estructurados en `lib/data`.
- `BrandImage` dejará de mostrar placeholders cuando exista una fotografía real asignada.
- Las fotografías seleccionadas se copiarán a `public/images/pro-ingema/` con nombres descriptivos.
- `next/image` gestionará tamaño, carga diferida y textos alternativos.
- El contenido técnico extenso se mantendrá en módulos de datos, no incrustado en grandes componentes JSX.

## Estados y accesibilidad

- Enlaces y botones tendrán foco visible.
- El menú podrá abrirse y cerrarse con teclado y expondrá sus estados mediante atributos ARIA.
- El bloqueo de scroll del menú se restaurará siempre al cerrar o desmontar.
- El contenido será comprensible sin JavaScript ornamental.
- Todas las fotografías significativas tendrán texto alternativo descriptivo.
- Se mantendrá contraste AA en texto y controles.
- Habrá un enlace “Saltar al contenido”.
- Los enlaces sin destino real no se publicarán como enlaces activos.
- El formulario de contacto mostrará validación inline y mensajes directos; no usará `window.alert()`.

## Rendimiento y compatibilidad

- Mantener Next.js 16.2.10, React 19 y Tailwind CSS 4.
- No incorporar nuevas dependencias visuales salvo que una necesidad no pueda resolverse con el stack existente.
- Usar imágenes locales optimizadas mediante `next/image`.
- Evitar fondos remotos y dependencias de Unsplash en la experiencia final.
- Verificar escritorio y móvil, incluyendo navegación, legibilidad, overflow y objetivos táctiles.
- Usar `min-height: 100dvh` para secciones de pantalla completa.

## Manejo de errores

- Si una imagen no existe, el componente mostrará una superficie de marca estable sin afectar el layout.
- El formulario conservará los datos introducidos cuando una validación falle.
- Las rutas no encontradas usarán una página 404 coherente con la identidad visual.
- Los fallos de carga no ocultarán el contenido textual principal.

## Verificación

La implementación se considerará terminada únicamente cuando:

- Las pruebas automatizadas de contenido y navegación pasen.
- `npm run lint` termine sin errores.
- `npm run build` termine con código de salida 0.
- La portada y las rutas internas principales se inspeccionen en el navegador.
- Se validen escritorio y móvil.
- No haya errores de consola, enlaces muertos, overflow horizontal ni contenido invisible por animaciones.
- El resultado visual conserve claramente la composición, la paleta y el carácter del diseño aprobado.

## Restricciones

- No reemplazar la dirección visual por el concepto claro “Territorio técnico” mostrado después.
- No migrar el framework ni el sistema de estilos.
- No eliminar rutas o contenido existente sin una sustitución equivalente basada en el contexto entregado.
- No sobrescribir cambios ajenos al alcance del rediseño.
