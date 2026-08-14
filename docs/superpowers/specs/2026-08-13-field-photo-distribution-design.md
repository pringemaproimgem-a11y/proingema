# Diseño de distribución de fotografías de campo

Fecha: 2026-08-13

## Objetivo

Incorporar las 25 fotografías entregadas por PRO INGEMA S.A.C. en lugares técnicamente coherentes de la web, sustituyendo imágenes genéricas cuando corresponda y evitando saturación, repeticiones visibles o asociaciones incorrectas con servicios y proyectos.

## Alcance

- Optimizar copias web de las 25 fotografías sin modificar los archivos originales.
- Distribuir una selección curada entre la portada, Servicios, Geotecnia y Proyectos.
- Reemplazar la galería de muestra por una galería completa con las 25 fotografías reales.
- Mantener el diseño adaptable a móvil, accesible y consistente con la identidad visual existente.
- No modificar fotografías ni asignarlas a servicios como laboratorio o geofísica cuando el contenido no los representa.

## Clasificación del material

Las fotografías se agrupan por el trabajo visible, no solamente por su carpeta de origen:

1. **Calicatas y estudios de suelos:** excavaciones, reconocimiento del terreno, medición de calicatas y registro de trabajos urbanos o rurales.
2. **Densidad de campo:** ejecución del ensayo de cono de arena, preparación de muestras y equipo de medición en vías.
3. **Obras viales:** contexto de control de calidad, compactación y trabajo técnico sobre vías en ejecución.

Una misma fotografía tendrá una sola categoría principal en la galería. Las tomas casi idénticas permanecerán disponibles allí, pero no se reutilizarán juntas en páginas destacadas.

## Distribución por página

### Portada

- Sustituir la fotografía genérica externa del encabezado por una imagen panorámica real de trabajo en campo.
- Sustituir la fotografía genérica de la sección “Quiénes somos” por una imagen real del equipo trabajando.
- Usar dos escenas claramente diferentes para evitar repetición visual.
- Mantener los degradados actuales para conservar legibilidad del texto y llamadas a la acción.

### Servicios

- Reemplazar la imagen de **Estudios geotécnicos** por una calicata o medición de excavación.
- Reemplazar la imagen de **Ensayos de campo** por una escena de densidad de campo en vía.
- Mantener sin cambios las imágenes de laboratorio, geofísica, ambiente y consultoría, porque las fotografías nuevas no representan esos servicios de forma directa.
- No añadir un carrusel adicional: las tarjetas existentes son suficientes para mostrar la evidencia fotográfica sin alargar la página.

### Geotecnia

- Mantener la información técnica de cada ensayo existente.
- Añadir después del catálogo técnico una sección “Trabajo geotécnico en campo”.
- Mostrar una selección breve de calicatas urbanas y rurales en una cuadrícula editorial adaptable.
- Usar títulos descriptivos generales, sin afirmar ubicación, cliente o contrato cuando no estén confirmados por los datos de la web.
- No utilizar fotografías de calicatas como ilustración específica de SPT, DPL o CBR si el ensayo no aparece en la imagen.

### Proyectos

- Añadir una sección “Trabajos recientes en campo” debajo del portafolio actual.
- Presentar una selección equilibrada de escenas urbanas, rurales y viales.
- Usar descripciones neutrales centradas en la actividad visible: exploración, medición, control de compactación y seguimiento técnico.
- No reemplazar imágenes de proyectos con fotografías cuyo cliente o alcance no coincida con la ficha existente.

### Galería

- Reemplazar las 12 imágenes de muestra por las 25 fotografías oficiales proporcionadas.
- Filtros visibles: **Todos**, **Calicatas**, **Densidad de campo** y **Obras viales**.
- Mantener la composición tipo mosaico para respetar fotografías horizontales y verticales.
- Permitir abrir cada fotografía en un visor ampliado accesible.
- El visor tendrá cierre visible, cierre con `Escape`, navegación anterior/siguiente y texto alternativo descriptivo.
- En móvil, las fotografías se mostrarán en una columna y el visor respetará el tamaño disponible.

## Gestión de imágenes

- Copiar los archivos fuente a una carpeta organizada dentro de `public/images/field-work/`.
- Generar copias optimizadas con un ancho o alto máximo apropiado para web, conservando proporción y orientación.
- Usar compresión visual de alta calidad para reducir el peso de los archivos grandes de 4–10 MB.
- Mantener intactos los originales en `D:\brochure pro ingema`.
- Usar nombres descriptivos y estables en lugar de UUID o nombres de cámara cuando sea práctico.
- Los textos alternativos describirán lo visible y evitarán datos no confirmados.

## Componentes y datos

- Centralizar metadatos, categoría, texto alternativo y rutas en el módulo de datos de galería.
- Ampliar el tipo de imagen de galería solamente con los campos necesarios para distribución y visor.
- Crear un componente reutilizable para las selecciones fotográficas de Geotecnia y Proyectos, o mantener componentes separados si sus composiciones necesitan contenido distinto.
- Reutilizar `BrandImage`, `Container`, `SectionHeading` y las utilidades de animación ya presentes.
- El contenido seguirá funcionando si una imagen no carga mediante el respaldo visual existente de `BrandImage`.

## Rendimiento y accesibilidad

- Las imágenes fuera del primer viewport usarán carga diferida mediante el sistema de imágenes actual.
- La fotografía principal tendrá prioridad de carga cuando la implementación existente lo permita.
- No cargar los archivos originales de alta resolución directamente en el navegador.
- Respetar `prefers-reduced-motion`; el visor y los filtros no dependerán de animaciones para funcionar.
- Botones, filtros y controles del visor tendrán etiquetas accesibles y foco visible.
- Evitar cambios de tamaño durante la carga reservando proporciones coherentes.

## Verificación

- Pruebas de datos para confirmar que las 25 fotografías estén registradas, tengan rutas únicas, categorías válidas y textos alternativos no vacíos.
- Pruebas del visor para apertura, cierre, navegación y teclado.
- Revisión de que Portada, Servicios, Geotecnia y Proyectos usen únicamente imágenes correspondientes a su contenido.
- Comprobación de existencia de todos los archivos optimizados.
- Ejecución de pruebas automatizadas, ESLint y compilación de producción.
- Revisión visual en escritorio y móvil para detectar recortes inadecuados, texto ilegible, repetición excesiva o desbordamiento.

## Criterios de aceptación

- Las 25 fotografías aparecen en la galería y se pueden ampliar.
- La portada y las páginas técnicas muestran fotografías reales relevantes.
- Ninguna fotografía se presenta como evidencia de un ensayo, cliente o proyecto que no corresponda.
- Las fotografías grandes se sirven en versiones optimizadas y la web conserva una carga fluida.
- El diseño funciona correctamente en escritorio y móvil, con navegación por teclado en el visor.
