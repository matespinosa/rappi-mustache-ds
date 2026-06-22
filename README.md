# Rappi Design System · Portal

Portal de documentación **interactiva** del design system de Rappi
([`@rappi-ds/react`](https://www.npmjs.com/package/@rappi-ds/react)). Cada
componente tiene una página con ejemplos en vivo, su código y una tabla de props,
y puedes previsualizar todo con cualquiera de los **12 temas de producto** desde el
selector de la barra superior.

Construido **desde cero** con Vite + React 19 + TypeScript.

## Requisitos

- Node ≥ 20
- pnpm ≥ 9

## Comandos

```bash
pnpm install        # instala dependencias
pnpm dev            # servidor de desarrollo en http://localhost:5173
pnpm build          # build de producción a dist/
pnpm preview        # sirve el build de producción
pnpm typecheck      # solo verificación de tipos
pnpm generate:props # regenera las tablas de props (ver abajo)
```

> `dev` y `build` ejecutan `generate:props` automáticamente (hooks `predev` /
> `prebuild`).

## Cómo está construido

```
src/
├── main.tsx                 # entrada: importa tokens + temas + estilos del DS y monta la app
├── App.tsx                  # rutas (react-router): home, /components/:slug, /foundations/tokens
├── index.css                # estilos del portal — usan las variables de @rappi-ds/tokens
├── theme/
│   └── ThemeContext.tsx     # envuelve la app en <ThemeProvider> y expone el tema activo
├── components/              # "chrome" del portal (no es del DS)
│   ├── AppLayout.tsx        # topbar + sidebar + contenido
│   ├── Sidebar.tsx          # navegación con buscador (usa el Search del DS)
│   ├── Topbar.tsx
│   ├── ThemeSwitcher.tsx    # selector de tema (usa el Select del DS)
│   ├── ExampleBlock.tsx     # demo en vivo + botón "ver código"
│   ├── CodeBlock.tsx        # bloque de código con copiar
│   └── PropsTable.tsx       # tabla de props (lee props.generated.json)
├── pages/
│   ├── HomePage.tsx         # overview + setup + grid de componentes
│   ├── ComponentPage.tsx    # plantilla de página de componente
│   ├── TokensPage.tsx       # swatches de tokens de color del tema activo
│   └── NotFoundPage.tsx
├── data/
│   ├── types.ts             # contrato ComponentDoc / ComponentExample
│   ├── registry.ts          # une todos los módulos de ejemplos + agrupa por categoría
│   └── props.generated.json # GENERADO — no editar a mano
└── examples/                # un módulo por categoría, cada uno exporta ComponentDoc[]
    ├── acciones.tsx         # Button, IconButton, Chip
    ├── formularios.tsx      # TextField, TextArea, TextFieldPhone, Search, Select,
    │                        #   ComboBox, Checkbox, Radio/RadioGroup, Toggle, Pin, Uploader
    ├── navegacion.tsx       # Tabs, Breadcrumb, Pagination, SegmentedControl
    ├── feedback.tsx         # Notification, Snackbar, Tooltip, Tag, BadgeNumber, BadgeLive, EmptyState
    ├── overlays.tsx         # Dialog, BottomSheet, Drawer
    ├── contenido.tsx        # Card, CardAction, Accordion, Calendar
    ├── datos.tsx            # DataTable, CardTable, TableCell/TableHeaderCell
    └── sistema.tsx          # ThemeProvider
```

## Tablas de props automáticas

`scripts/generate-props.mjs` parsea el archivo de tipos que publica la librería
(`node_modules/@rappi-ds/react/dist/index.d.ts`) y extrae, para cada componente,
**solo sus props propias del design system** (no los cientos de atributos nativos
heredados del DOM) junto con su descripción JSDoc y su valor por defecto. El
resultado se escribe en `src/data/props.generated.json`.

Esto mantiene las tablas siempre fieles a la versión instalada: cuando subas la
versión de `@rappi-ds/react`, vuelve a correr `pnpm generate:props`.

## Temas

`main.tsx` importa `@rappi-ds/tokens/base.css` (define los tokens en `:root` y
carga la tipografía PP Object Sans), el tema base Merchants y los 11 CSS de tema. El `ThemeProvider`
del DS cambia el atributo `data-theme`. El portal también sincroniza ese atributo
en el documento para que los componentes montados mediante portales (Dialog,
Drawer, BottomSheet, etc.) hereden el mismo tema y accent que el resto de la UI.

## Agregar un componente nuevo

1. Añade un `ComponentDoc` al módulo de su categoría en `src/examples/`.
2. Si tiene props nuevas, corre `pnpm generate:props` (o deja que lo haga `dev`).
3. Aparece automáticamente en el sidebar, el home y su ruta `/components/<slug>`.
