# Blueprint del Proyecto: PhotoForge AI Editor

## 1. Visión General

**PhotoForge AI Editor** es un editor de fotos web moderno e intuitivo, diseñado para ofrecer una experiencia de edición potente directamente en el navegador. La aplicación utiliza el poder de la API de Google Gemini para permitir a los usuarios realizar retoques precisos, aplicar filtros artísticos y ejecutar tareas especializadas como el cambio de logos, todo a través de simples instrucciones de texto. Su interfaz oscura y temática espacial se centra en la imagen, eliminando distracciones y proporcionando un entorno de trabajo inmersivo y agradable.

## 2. Características Principales (Core Features)

- **Carga y Gestión de Imágenes:**
  - **Carga Local:** Los usuarios pueden subir imágenes (JPEG, PNG, etc.) desde su dispositivo mediante un botón o arrastrando y soltando el archivo.
  - **Estado Inicial:** Al iniciar, la aplicación muestra una pantalla de bienvenida que destaca sus capacidades de IA e invita al usuario a subir una imagen.

- **Edición Asistida por IA (con Google Gemini):**
  - **Retoque Preciso (Localized Retouching):** Permite al usuario hacer clic en un área específica de la imagen y proporcionar una instrucción de texto (ej. "cambia el color de mi camisa a azul", "elimina la arruga") para que la IA realice una modificación localizada y realista.
  - **Filtros Creativos:** Una selección de filtros preestablecidos (Synthwave, Anime, Lomo, Holograma) y un campo de texto para que el usuario describa su propio estilo artístico, que la IA aplica a toda la imagen.
  - **Cambio de Logo (Logo Swap):** Una herramienta especializada que reemplaza automáticamente un logo específico ('Jack Và') en el pie de página de una imagen por uno nuevo ('PH Precio Hogar'), demostrando una capacidad de edición contextual precisa.

- **Gestión de Flujo de Trabajo:**
  - **Historial (Deshacer/Rehacer):** La aplicación guarda un historial de cada cambio, permitiendo al usuario navegar libremente hacia atrás y adelante en sus ediciones.
  - **Comparación:** Una función para mantener presionado un botón ("Comparar") y ver la imagen original, permitiendo una rápida evaluación de los cambios realizados.
  - **Reiniciar:** Un botón para descartar todas las ediciones y volver al estado original de la imagen cargada.
  - **Subir Nueva:** Permite al usuario descartar la imagen actual y su historial para comenzar a editar una nueva foto.
  - **Descarga:** Permite a los usuarios descargar la imagen editada en su formato original.

## 3. Guía de Estilo y Diseño de Interfaz (UI/UX)

- **Paleta de Colores (Tema Espacial Oscuro):**
  - **Fondo Principal:** Negro/Gris oscuro con un fondo animado de nebulosas y estrellas (`#090A0F`).
  - **Color Primario:** Azul brillante (`bg-blue-600`, `text-blue-400`) para elementos activos, botones principales y acentos.
  - **Color de Acento:** Verde (`bg-green-600`) para el botón de descarga, indicando una acción final positiva.
  - **Primer Plano:** Blanco/Gris claro (`text-gray-100`, `text-gray-200`) para texto e iconos, garantizando alta legibilidad.

- **Tipografía:**
  - **Fuente Principal:** 'Inter' (sans-serif) para toda la interfaz, seleccionada por su claridad y aspecto moderno.

- **Diseño y Layout:**
  - **Estructura:** Una aplicación de página única (SPA). El diseño se centra en un gran visor de imagen en la parte superior. Debajo se encuentra un panel de pestañas para seleccionar la herramienta de edición.
  - **Panel de Herramientas:** Las herramientas se organizan en tres pestañas: `Retocar`, `Filtros Creativos` y `Cambiar Logo`. Cada pestaña muestra los controles correspondientes.
  - **Visor de Imagen:** El área central muestra la imagen actual. En el modo "Retocar", el cursor se convierte en una cruz para indicar dónde hacer clic. Un punto azul animado marca la selección del usuario.
  - **Barra de Acciones:** Un conjunto de botones en la parte inferior de la interfaz proporciona acceso a acciones globales como `Deshacer`, `Rehacer`, `Comparar`, `Reiniciar`, `Subir Nueva` y `Descargar`.

- **Iconografía:**
  - Se utiliza un conjunto de iconos SVG personalizados y minimalistas (`UploadIcon`, `UndoIcon`, `RedoIcon`, `EyeIcon`, etc.) para mantener un estilo visual consistente.

## 4. Arquitectura y Pila Tecnológica

- **Framework:** React.
- **Lenguaje:** TypeScript.
- **Estilos:** Tailwind CSS para un diseño basado en utilidades que permite una rápida maquetación y personalización.
- **Gestión de Estado:** Hooks nativos de React (`useState`, `useCallback`, `useRef`, `useEffect`) para gestionar el estado de la aplicación de forma local y eficiente dentro del componente principal.
- **Funcionalidad de IA:** El SDK `@google/genai` para interactuar con la API de Google Gemini. Específicamente, se utiliza el modelo `gemini-2.5-flash-image-preview` para todas las tareas de manipulación de imágenes.

## 5. Desglose de Componentes

- **`App.tsx`**: El componente principal y orquestador de la aplicación.
  - **Rol:** Maneja todo el estado central, incluyendo el historial de imágenes (`history`), el índice del historial (`historyIndex`), el estado de carga (`isLoading`), los errores (`error`) y la pestaña activa (`activeTab`).
  - **Lógica:** Contiene las funciones para gestionar la carga de imágenes, deshacer/rehacer, y para invocar los servicios de IA de `geminiService.ts` en respuesta a las interacciones del usuario.

- **`components/StartScreen.tsx`**: La pantalla de bienvenida.
  - **Rol:** Se muestra cuando no hay ninguna imagen cargada. Invita al usuario a subir un archivo y describe las principales características de la aplicación.

- **`components/Header.tsx`**: El encabezado de la aplicación.
  - **Rol:** Muestra el título "Editor de Fotos IA" y un icono decorativo.

- **`components/FilterPanel.tsx`**: El panel para la herramienta de filtros.
  - **Rol:** Proporciona botones para filtros preestablecidos y un campo de texto para un filtro personalizado. Llama a la función `onApplyFilter` de `App.tsx`.

- **`components/SwapLogoPanel.tsx`**: El panel para la herramienta de cambio de logo.
  - **Rol:** Contiene el botón para ejecutar el reemplazo del logo y, una vez completado, ofrece un botón secundario para aplicar un filtro "Synthwave".

- **`components/icons.tsx`**: Un archivo que exporta todos los componentes de iconos SVG utilizados en la interfaz para una gestión centralizada.

- **`services/geminiService.ts`**: El módulo de lógica de IA.
  - **Rol:** Abstrae toda la comunicación con la API de Google Gemini.
  - **Lógica:** Contiene tres funciones asíncronas principales: `generateEditedImage` (para retoques), `generateFilteredImage` (para filtros) y `generateSwappedLogoImage` (para el cambio de logo). También incluye funciones auxiliares para convertir archivos a formato base64 y para manejar las respuestas y errores de la API.

- **Spinner de Carga:** Cuando la aplicación está cargando una imagen o aplicando una edición de IA, muestra un spinner sutil superpuesto en el centro de la imagen, con un efecto de desenfoque de fondo (backdrop-blur) para indicar la operación en curso.