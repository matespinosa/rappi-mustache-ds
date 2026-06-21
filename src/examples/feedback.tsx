import { useState } from 'react'
import {
  Notification,
  Snackbar,
  Tooltip,
  Tag,
  BadgeNumber,
  BadgeLive,
  EmptyState,
} from '@rappi-ds/react'
import { Info, Star, ShoppingBag } from '@rappi-ds/icons'
import type { ComponentDoc } from '../data/types'

export const feedbackDocs: ComponentDoc[] = [
  {
    slug: 'notification',
    name: 'Notification',
    category: 'Feedback',
    description:
      'Banner inline o toast compacto con intención semántica (success, warning, error, info, ai), variantes solid/pastel, icono o imagen, acción inline y botón de cierre.',
    examples: [
      {
        title: 'Intenciones',
        stack: true,
        code: `<Notification intent="success" message="Cambios guardados correctamente" onClose={() => {}} />
<Notification intent="warning" message="Tu sesión está por expirar" />
<Notification intent="error" message="No se pudo procesar el pago" />
<Notification intent="info" variant="pastel" message="Hay una nueva versión disponible" />`,
        Demo: () => (
          <>
            <Notification intent="success" message="Cambios guardados correctamente" onClose={() => {}} />
            <Notification intent="warning" message="Tu sesión está por expirar" />
            <Notification intent="error" message="No se pudo procesar el pago" />
            <Notification intent="info" variant="pastel" message="Hay una nueva versión disponible" />
          </>
        ),
      },
      {
        title: 'Con acción',
        stack: true,
        code: `<Notification
  intent="info"
  message="Eliminaste un producto"
  action="Deshacer"
  onAction={() => {}}
  onClose={() => {}}
/>`,
        Demo: () => (
          <Notification
            intent="info"
            message="Eliminaste un producto"
            action="Deshacer"
            onAction={() => {}}
            onClose={() => {}}
          />
        ),
      },
    ],
  },
  {
    slug: 'snackbar',
    name: 'Snackbar',
    category: 'Feedback',
    description:
      'Toast / snackbar para confirmaciones efímeras. Soporta icono, avatar, spinner de carga y una acción de texto, navegación o cierre en el extremo derecho.',
    examples: [
      {
        title: 'Variantes',
        stack: true,
        code: `<Snackbar icon={<Info />} message="Conexión restablecida" onClose={() => {}} />
<Snackbar message="Pedido en camino" actionLabel="Ver" onAction={() => {}} />
<Snackbar loading message="Subiendo archivo…" />`,
        Demo: () => (
          <>
            <Snackbar icon={<Info />} message="Conexión restablecida" onClose={() => {}} />
            <Snackbar message="Pedido en camino" actionLabel="Ver" onAction={() => {}} />
            <Snackbar loading message="Subiendo archivo…" />
          </>
        ),
      },
    ],
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Feedback',
    description:
      'Burbuja de información contextual. Componente presentacional: posiciona la burbuja con arrowPosition y opcionalmente muestra un icono a la izquierda y un botón de cierre.',
    examples: [
      {
        title: 'Con flecha e icono',
        stack: true,
        code: `<Tooltip arrowPosition="bottom-center">
  Este es un tooltip informativo
</Tooltip>

<Tooltip icon={<Info />} arrowPosition="top-left" onClose={() => {}}>
  Tooltip con icono y cierre
</Tooltip>`,
        Demo: () => (
          <>
            <Tooltip arrowPosition="bottom-center">Este es un tooltip informativo</Tooltip>
            <Tooltip icon={<Info />} arrowPosition="top-left" onClose={() => {}}>
              Tooltip con icono y cierre
            </Tooltip>
          </>
        ),
      },
    ],
  },
  {
    slug: 'tag',
    name: 'Tag',
    category: 'Feedback',
    description:
      'Etiqueta de estado no interactiva. La intención define la paleta de color y la variante (solid, pastel, outline, ghost) el tratamiento visual.',
    examples: [
      {
        title: 'Intenciones',
        code: `<Tag intent="standard">Standard</Tag>
<Tag intent="success">Éxito</Tag>
<Tag intent="warning">Atención</Tag>
<Tag intent="error">Error</Tag>
<Tag intent="info">Info</Tag>
<Tag intent="ai">AI</Tag>`,
        Demo: () => (
          <>
            <Tag intent="standard">Standard</Tag>
            <Tag intent="success">Éxito</Tag>
            <Tag intent="warning">Atención</Tag>
            <Tag intent="error">Error</Tag>
            <Tag intent="info">Info</Tag>
            <Tag intent="ai">AI</Tag>
          </>
        ),
      },
      {
        title: 'Variantes e icono',
        code: `<Tag intent="success" variant="solid">solid</Tag>
<Tag intent="success" variant="pastel">pastel</Tag>
<Tag intent="success" variant="outline">outline</Tag>
<Tag intent="success" variant="ghost" startIcon={<Star />}>ghost</Tag>`,
        Demo: () => (
          <>
            <Tag intent="success" variant="solid">solid</Tag>
            <Tag intent="success" variant="pastel">pastel</Tag>
            <Tag intent="success" variant="outline">outline</Tag>
            <Tag intent="success" variant="ghost" startIcon={<Star />}>ghost</Tag>
          </>
        ),
      },
    ],
  },
  {
    slug: 'badge-number',
    name: 'BadgeNumber',
    category: 'Feedback',
    description:
      'Badge numérico compacto o punto de estado vacío. Tres apariencias (accent, light, dark) y cinco tamaños.',
    examples: [
      {
        title: 'Con valor y como punto',
        code: `<BadgeNumber appearance="accent" value={3} />
<BadgeNumber appearance="dark" value={12} />
<BadgeNumber appearance="light" value={99} />
<BadgeNumber appearance="accent" showValue={false} />`,
        Demo: () => (
          <>
            <BadgeNumber appearance="accent" value={3} />
            <BadgeNumber appearance="dark" value={12} />
            <BadgeNumber appearance="light" value={99} />
            <BadgeNumber appearance="accent" showValue={false} />
          </>
        ),
      },
    ],
  },
  {
    slug: 'badge-live',
    name: 'BadgeLive',
    category: 'Feedback',
    description:
      'Indicador de punto para el estado operativo de una tienda: active, inactive, closed o suspended. Puede animarse.',
    examples: [
      {
        title: 'Estados',
        code: `<BadgeLive status="active" animated />
<BadgeLive status="inactive" />
<BadgeLive status="closed" />
<BadgeLive status="suspended" />`,
        Demo: () => (
          <>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <BadgeLive status="active" animated aria-label="Activa" /> Activa
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <BadgeLive status="inactive" aria-label="Inactiva" /> Inactiva
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <BadgeLive status="closed" aria-label="Cerrada" /> Cerrada
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <BadgeLive status="suspended" aria-label="Suspendida" /> Suspendida
            </span>
          </>
        ),
      },
    ],
  },
  {
    slug: 'empty-state',
    name: 'EmptyState',
    category: 'Feedback',
    description:
      'Estado vacío o de error con icono, texto y una acción opcional. Tamaño md para secciones y lg para pantallas completas; admite estado skeleton.',
    examples: [
      {
        title: 'Tamaño medio (sección)',
        stack: true,
        code: `<EmptyState
  icon={<ShoppingBag />}
  title="No hay pedidos"
  description="Aún no tienes pedidos activos."
  actionLabel="Actualizar"
  onAction={() => {}}
/>`,
        Demo: () => (
          <EmptyState
            icon={<ShoppingBag />}
            title="No hay pedidos"
            description="Aún no tienes pedidos activos."
            actionLabel="Actualizar"
            onAction={() => {}}
          />
        ),
      },
      {
        title: 'Skeleton de carga',
        stack: true,
        code: `<EmptyState skeleton />`,
        Demo: function EmptyStateSkeletonDemo() {
          const [loading, setLoading] = useState(true)
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <EmptyState
                skeleton={loading}
                icon={<ShoppingBag />}
                title="Contenido cargado"
                description="Los datos ya están disponibles."
                showAction={false}
              />
              <Tag intent="info" variant="pastel" size="sm">
                <button
                  type="button"
                  onClick={() => setLoading((v) => !v)}
                  style={{ all: 'unset', cursor: 'pointer' }}
                >
                  {loading ? 'Mostrar contenido' : 'Mostrar skeleton'}
                </button>
              </Tag>
            </div>
          )
        },
      },
    ],
  },
]
