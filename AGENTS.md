# aranzazu-connect

## Descripción del Proyecto
Dashboard web interactivo diseñado para el monitoreo y reporte de incidencias viales en el municipio de Aranzazu, Caldas, Colombia.

## Stack Tecnológico
- **Framework:** React + Vite
- **Estilos:** CSS puro usando metodología **BEM** (Block Element Modifier). **NO SE DEBE USAR TailwindCSS**.
- **Mapas:** `react-leaflet` y `leaflet`.
- **Gráficos:** `recharts`.
- **Iconos:** `lucide-react`.

## Estructura del Proyecto
- `src/components/`: Componentes organizados por dominio funcional (`Map`, `Sidebar`, `Incidents`, `History`, `Connections`, `ThemeToggle`, `FloatingMenu`).
- `src/styles/`: Archivos CSS separados por componentes usando BEM.
  - `main.css`: Variables CSS globales (colores, sombras, tipografía) y temas claro/oscuro.
  - `components/_*.css`: Archivos específicos de estilos de cada componente (ej: `_map.css`, `_sidebar.css`).

## Decisiones de Arquitectura y Reglas Importantes
1. **Responsividad y Layout:**
   - En *Desktop*, el mapa ocupa el centro y derecha, y hay un Sidebar visible a la izquierda con todas las tarjetas (cards).
   - En *Mobile*, el mapa asume el 100% de la pantalla. Se emplea un **menú flotante (Floating Menu)** en la parte inferior para mostrar un componente a la vez.

2. **Tema Claro y Oscuro:**
   - Soportado de forma nativa a través de variables CSS. Todo nuevo componente debe respetar los selectores CSS de tema (e.g. `[data-theme='dark']`) para sus colores de fondo, bordes y texto.

3. **Mapas y Geocodificación:**
   - La librería principal es `react-leaflet`.
   - El mapa se debe mantener centrado por defecto en Aranzazu, Caldas (Coordenadas aproximadas: `[5.2818, -75.4839]`).
   - El formulario de "Nueva incidencia" utiliza la **API gratuita de Nominatim (OpenStreetMap)** para convertir texto (ubicación) a coordenadas. A todas las búsquedas se les anexa de forma silenciosa el string `, Aranzazu, Caldas, Colombia` para afinar los resultados.

4. **Componentes y UI:**
   - Las tarjetas (Cards) tienen su propio archivo CSS (`_card.css`) y deben encapsularse.
   - Las alertas y errores deben usar los colores semánticos (`--color-danger`, `--color-success`, `--color-warning`) definidos en `main.css`.
