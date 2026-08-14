# Carrusel de logos de clientes

## Objetivo

Reemplazar las tarjetas provisionales con icono y texto por los siete logos reales proporcionados por el usuario. El mismo carrusel se mostrará en la portada y en `/clientes`.

## Logos y correspondencia

| Archivo fuente | Institución |
| --- | --- |
| `1.png` | Plan COPESCO |
| `2.png` | Gobierno Regional Cusco |
| `3.png` | Provías Descentralizado |
| `4.png` | Gobierno Regional Apurímac |
| `5.png` | Proyecto Especial Sierra Centro Sur (PESCS) |
| `6.png` | Gobierno Regional Madre de Dios |
| `7.png` | Instituto de Manejo de Agua y Medio Ambiente (IMA) |

## Preparación de activos

- Copiar los siete PNG al directorio público del proyecto con nombres descriptivos.
- Conservar colores, proporciones y contenido original.
- Recortar únicamente los píxeles totalmente transparentes sobrantes y mantener un margen transparente uniforme alrededor del arte.
- No redibujar, recolorear ni generar versiones nuevas de los logos.
- Mantener PNG con canal alfa y generar archivos derivados optimizados para uso web.

## Presentación

- Usar tarjetas de fondo blanco suave sobre la sección oscura para garantizar contraste con logos claros y oscuros.
- Todas las tarjetas tendrán un lienzo visual uniforme, esquinas redondeadas, borde sutil y sombra contenida.
- Cada logo se mostrará completo con `object-contain`, centrado y con espacio interior suficiente.
- El tamaño será responsive: tarjetas más compactas en móvil y más amplias en escritorio.
- Cada imagen tendrá un texto alternativo con el nombre completo de la institución.

## Movimiento

- Mantener un carrusel horizontal continuo y sin saltos mediante una segunda copia de la lista.
- Conservar una velocidad tranquila y constante.
- Pausar el movimiento al pasar el cursor para facilitar la observación.
- Respetar `prefers-reduced-motion`: cuando el usuario reduzca movimiento, detener la animación y permitir desplazamiento horizontal manual.
- Conservar los degradados laterales para suavizar la entrada y salida de elementos.

## Datos y reutilización

- Extender cada cliente en `lib/data/clients.ts` con la ruta del logo y texto alternativo.
- `ClientsMarquee.tsx` consumirá esos datos y seguirá siendo el único componente del carrusel.
- Al ser compartido, la portada y `/clientes` recibirán la actualización automáticamente.
- La cuadricula inferior de `/clientes` queda fuera de este cambio; solo se actualizaran las dos instancias del carrusel compartido.

## Verificación

- Probar que existen exactamente siete clientes con logos válidos y archivos públicos presentes.
- Comprobar que los PNG derivados conservan canal alfa y dimensiones útiles.
- Ejecutar pruebas, lint y build.
- Revisar portada y `/clientes` en móvil y escritorio: logos legibles, sin deformación, sin recortes y sin desbordamiento vertical u horizontal inesperado.
