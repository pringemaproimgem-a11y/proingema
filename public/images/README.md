# Carpeta de imágenes — PRO INGEMA S.A.C.

Esta carpeta está preparada para reemplazar los **placeholders de marca**
(paneles con degradado + ícono) por fotografías reales del proyecto.

## Cómo funciona

Cada imagen del sitio se referencia por una ruta fija (por ejemplo
`/images/servicios/estudios-geotecnicos.jpg`) definida en los archivos de
`lib/data/*.ts`. El componente `BrandImage` verifica en el servidor si el
archivo existe dentro de `public/images/...`:

- **Si el archivo existe** → se muestra la fotografía real, optimizada con
  `next/image`.
- **Si el archivo no existe** → se muestra automáticamente un placeholder de
  marca (fondo oscuro, cuadrícula tipo plano de ingeniería, ícono).

**No se requiere ningún cambio de código.** Basta con colocar el archivo con
el nombre exacto indicado abajo en la subcarpeta correspondiente, y la
próxima vez que se recargue la página (o se vuelva a compilar) se mostrará
la foto real.

Formatos recomendados: `.jpg` o `.webp`, orientación horizontal, mínimo
1600×1000 px, peso optimizado (idealmente menor a 400 KB).

---

## Estructura y nombres de archivo esperados

### `hero/`
Imágenes de fondo para el hero principal (actualmente se usa una fotografía
de stock verificada; puedes reemplazarla editando `components/home/Hero.tsx`).

### `servicios/`
- `estudios-geotecnicos.jpg`
- `mecanica-de-suelos.jpg`
- `estudios-geologicos.jpg`
- `estudios-ambientales.jpg`
- `laboratorio-de-suelos.jpg`
- `laboratorio-concreto-asfalto.jpg`

### `geotecnia/`
- `cono-de-arena.jpg`
- `dpl.jpg`
- `spt.jpg`
- `cbr-campo.jpg`
- `perfil-estratigrafico.jpg`
- `humedad-speedy.jpg`

### `laboratorio/`
Fotografías adicionales de ensayos de laboratorio (opcional, referenciadas
directamente en `app/laboratorio/page.tsx`).

### `proyectos/`
- `estudio-geotecnico-via-cusco.jpg`
- `control-calidad-obra-publica-copesco.jpg`
- `mecanica-suelos-edificacion-privada.jpg`
- `laboratorio-concreto-infraestructura.jpg`
- `estudio-geologico-canteras.jpg`
- `supervision-obra-provias.jpg`

### `galeria/`
- `campo-1.jpg`, `campo-2.jpg`, `campo-3.jpg`
- `laboratorio-1.jpg`, `laboratorio-2.jpg`, `laboratorio-3.jpg`
- `equipos-1.jpg`, `equipos-2.jpg`
- `personal-1.jpg`, `personal-2.jpg`
- `obras-1.jpg`, `obras-2.jpg`

### `blog/`
- `estudio-suelos.jpg`
- `normativa-e050.jpg`
- `viga-benkelman.jpg`
- `nuevos-proyectos.jpg`

### `equipo/`
- `alberth-mallqui.jpg` (Gerente General)

### `nosotros/`
Fotografías institucionales adicionales (opcional).

### `clientes/`
Logos institucionales reales en PNG con fondo transparente (opcional; el
sitio muestra por defecto una versión en texto con ícono).

---

## Sugerencias de contenido fotográfico

Para mantener la identidad "ingeniería + geotecnia + tecnología", prioriza:

- Ingenieros en campo con equipos de ensayo (SPT, cono de arena, etc.)
- Laboratorio de suelos y de concreto/asfalto en uso
- Maquinaria pesada y obras viales en ejecución
- Muestras de roca, testigos de concreto, briquetas
- Retratos profesionales del equipo técnico con casco y chaleco
- Obras supervisadas (carreteras, edificaciones, puentes)

Evita imágenes genéricas de oficina o stock no relacionado con ingeniería
civil, geotecnia o construcción.
