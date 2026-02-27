# PokeApp

Aplicación web para explorar Pokémon, desarrollada con **Angular** y **Server-Side Rendering (SSR)**.

## Descripción

PokeApp permite consultar la lista de Pokémon con paginación y ver el detalle completo de cada uno: estadísticas, tipos, habilidades, altura, peso e imagen oficial. Los datos se obtienen de la [PokeAPI](https://pokeapi.co).

## Características principales

- **Lista de Pokémon** con paginación
- **Vista detalle** con información completa de cada Pokémon
- **SSR (Server-Side Rendering)** — Las páginas se generan en el servidor para mejor rendimiento y SEO
- **SEO optimizado** — Meta tags dinámicos (title, description, og:image) por Pokémon

## Tecnologías utilizadas

- **Angular 21** — Framework principal
- **Angular SSR** — Renderizado del lado del servidor
- **Tailwind CSS** — Estilos
- **RxJS** — Gestión de datos async

## Development server

```bash
ng serve
```

## Production build

```bash
ng build
```

## Running unit tests

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
