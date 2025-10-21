# FastParking: Sistema de Estacionamiento Inteligente

**FastParking** es una aplicación web moderna diseñada para digitalizar y simplificar la experiencia del usuario en un sistema de estacionamiento inteligente, desde la entrada hasta la salida.

## Descripción del Proyecto

Este proyecto reimagina el proceso de estacionamiento tradicional, eliminando la fricción y la incertidumbre. A través de una interfaz limpia e intuitiva, los usuarios pueden escanear su ticket de entrada, visualizar un mapa interactivo del estacionamiento en tiempo real, seleccionar un espacio disponible y ser guiados hasta él. El objetivo es crear una experiencia fluida, rápida y sin estrés.

##  Características Principales

- **Flujo de Usuario Simplificado:** Un proceso paso a paso que guía al usuario desde el escaneo del QR de entrada hasta la selección de su espacio.
- **Mapa de Estacionamiento Interactivo:** Visualización en tiempo real del estado de los espacios (disponibles, ocupados, accesibles).
- **Selección de Espacio Intuitiva:** Los usuarios pueden tocar un espacio en el mapa para seleccionarlo y confirmar su elección.
- **Soporte de Accesibilidad:** Permite a los usuarios indicar si necesitan un espacio accesible para ofrecerles las mejores opciones.
- **Tema Personalizable:** Selector de tema visual (claro, oscuro o basado en el sistema) para una experiencia de usuario cómoda en cualquier condición de luz.
- **Diseño Responsivo:** Interfaz adaptable que funciona perfectamente en dispositivos móviles y de escritorio.

##  Tecnologías Utilizadas

- **Frontend:** React, TypeScript
- **Bundler:** Vite
- **Estilos:** Tailwind CSS
- **Gestión de Estado:** Zustand
- **Enrutamiento:** React Router

##  Estructura del Proyecto

El código está organizado de manera modular para facilitar su mantenimiento y escalabilidad:

```
/
├── components/       # Componentes reutilizables (Mapa, Íconos, etc.)
├── src/
│   ├── data/         # Datos estáticos (ej. layout del estacionamiento)
│   ├── pages/        # Componentes de página para cada ruta
│   ├── store/        # Stores de Zustand para gestión de estado global
│   └── routes.tsx    # Configuración de las rutas de la aplicación
├── tailwind.config.js # Configuración de Tailwind CSS
└── vite.config.ts    # Configuración de Vite
```

##  Cómo Empezar

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd fastparking
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```

### Ejecución

-   Para iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o un puerto similar).

-   Para construir la aplicación para producción:
    ```bash
    npm run build
    ```
    Los archivos optimizados se generarán en el directorio `dist/`.
