# SensIA · Demo de monitoreo

## Abrir y publicar

Sitio estático para GitHub Pages. Subir el contenido de esta carpeta a la raíz del repositorio y seleccionar Settings → Pages → Deploy from a branch → main → /(root). Conservar assets/ y todos los archivos JS y CSS. Para revisar localmente: python -m http.server 8765.

## Mapa actual

El mapa geográfico interactivo funciona con Leaflet y OpenStreetMap. Muestra tres estaciones hipotéticas con iconos de sensor numerados y cuatro puntos críticos con círculos rojos. Al seleccionar una estación se actualizan las lecturas, los gráficos, el historial y la descarga CSV. Las capas permiten ocultar estaciones o puntos críticos. El enlace del panel abre la ubicación seleccionada en Google Maps.

Las coordenadas se eligieron de forma aproximada para la demo, inspiradas en la referencia aportada por el equipo. NO constituyen una georreferenciación del mapa original ni ubicaciones verificadas. Antes de usar el sitio fuera de una demostración, reemplazar las coordenadas de points y criticalPoints en app.js con ubicaciones confirmadas. No usar estos puntos para decidir si un lugar es seguro.

## Activar Google Maps dentro de la demo

1. Obtener una clave para Maps JavaScript API en Google Cloud según la documentación oficial. Google ofrece opciones de prueba; revisar las condiciones aplicables.
2. Restringir la clave a Maps JavaScript API y a los dominios autorizados de GitHub Pages y/o localhost.
3. Completar SENSIA_GOOGLE_MAPS_KEY en config.js. Es una clave de navegador: será visible en la web y debe estar restringida. No colocar credenciales de servidor ni contraseñas.
4. Para una prueba se usa DEMO_MAP_ID. Configurar un map ID propio cuando corresponda.
5. Recargar el sitio. Si la carga y la autorización funcionan, la etiqueta del mapa mostrará Google Maps. Comparte las mismas estaciones, datos, capas y puntos críticos.

Sin clave no se llama a Maps JavaScript API: el sitio funciona con OpenStreetMap. La versión de Google queda implementada pero pendiente de prueba con una clave válida. No se creó una cuenta ni se habilitó facturación.

Documentación: https://developers.google.com/maps/documentation/javascript/get-api-key
Carga de API: https://developers.google.com/maps/documentation/javascript/load-maps-js-api
Marcadores: https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization

## Datos y equipo

Las mediciones, la lluvia, los tiempos de aviso y los escenarios son simulados. No hay sensores conectados ni un modelo predictivo ejecutándose. No se envían alertas reales. El historial muestra únicamente las lecturas del escenario hasta la hora elegida. Las funciones futuras se identifican como propuestas.

team.js contiene los seis integrantes y sus funciones, proporcionados por el usuario. Las fotos se muestran en un marco 4:5 con encuadre por CSS, sin modificar sus archivos. El logo dice Analytics.

## Recursos y referencias

Mapa © OpenStreetMap contributors: https://www.openstreetmap.org/copyright
Política de teselas: https://operations.osmfoundation.org/policies/tiles/
Leaflet 1.9.4: assets/LEAFLET-LICENSE.txt
Mapa de referencia original y fotografías: aportados por el equipo.
Google Flood Hub (referencia de interacción): https://support.google.com/flood-hub/answer/15637289?hl=en
Ubidots (referencia visual): https://ubidots.com/
Antecedente local: https://www.ing.una.py/FIUNA3/?p=84962

El sitio no está afiliado a Google, Ubidots ni a instituciones públicas. No utiliza datos de Flood Hub ni de FIUNA. La publicación en GitHub Pages sigue pendiente de acceso autorizado al repositorio.
