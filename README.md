# RickandMorty-API

Proyecto de prueba para la API de Rick and Morty desarrollado con Angular 14+.  
Demuestra técnicas avanzadas como carga progresiva de datos, integración dual (REST y GraphQL), uso de Angular Material, directivas, pipes, widgets personalizados y gestión de estado con NgRx.

---

## Características

- **Listado de personajes:** Visualiza nombre, estado, especie, tipo, género y fecha de creación.
- **Filtros:** Búsqueda por texto y filtros configurables.
- **Detalles del personaje:** Al seleccionar, se muestran la imagen, origen, localización y un episodio (si existe).
- **Favoritos:** Permite marcar personajes como favoritos y visualizarlos.
- **Totales:** Muestra conteos por especie y tipo.
- **Carga progresiva:** Los datos se solicitan en bloques o páginas (paginación/infinite scroll).
- **Integración dual:** Soporte para REST y GraphQL mediante inyección de dependencias.

---

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/matias-munoz1/rickandmorty-api.git
    ```
2. **Instalar dependencias:**
   ```bash
     npm install

# Desarrollo
  **Inicia el servidor de desarrollo:**
   ```bash
    ng serve
   ```
---

# Notas
- **Carga progresiva:** Los datos se solicitan en bloques o páginas para optimizar el rendimiento.
- **Vistas condicionales:** Elementos del layout (por ejemplo, botones de “Obtener personaje aleatorio” y “Cambiar API”) se muestran solo en las rutas /rest y /graphql.
- **Gestión de estado:** Se utiliza NgRx para manejar funcionalidades como favoritos y el historial de personajes vistos.
- **Integración REST/GraphQL:** La inyección de dependencias permite reutilizar componentes tanto para REST como para GraphQL.

---

## Recursos

- [Angular CLI](https://angular.dev/tools/cli)  
  Herramienta oficial para desarrollar aplicaciones con Angular.

- [API de Rick and Morty](https://rickandmortyapi.com)  
  Documentación y endpoints oficiales para acceder a los datos de la API.
