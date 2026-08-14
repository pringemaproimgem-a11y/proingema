# Reemplazo del logotipo de PRO INGEMA

## Objetivo

Reemplazar la identidad provisional dibujada con texto y el bloque `PI` por el logotipo oficial blanco suministrado por el usuario, tanto en el encabezado como en el pie de página.

## Activo

- Fuente: `logo proingema.png` suministrado por el usuario.
- Destino público: `public/images/pro-ingema/logo-pro-ingema.png`.
- Formato: PNG RGBA, 1182 × 1331 píxeles.
- El archivo se conservará completo, blanco, transparente y sin alterar su composición.

## Integración

- Usar `next/image` en `Navbar.tsx` y `Footer.tsx` con texto alternativo descriptivo.
- Mostrar la imagen completa con proporción preservada mediante `object-contain`.
- Encabezado: tamaño compacto y responsive que no interfiera con la navegación ni con el menú móvil.
- Pie: tamaño mayor que permita reconocer el símbolo y el nombre de la empresa.
- El enlace del encabezado seguirá llevando a la página de inicio.

## Alcance

No se cambiarán colores, textos, navegación, animaciones ni estructura general. Se eliminarán únicamente las representaciones provisionales del logotipo en el encabezado y el pie.

## Verificación

- Confirmar que el activo público conserva canal alfa y esquinas transparentes.
- Ejecutar las pruebas y el linter existentes.
- Verificar encabezado y pie en anchos móvil y escritorio, sin deformación, recorte ni desbordamiento.
