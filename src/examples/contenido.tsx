import { useState } from 'react'
import { Card, CardAction, Accordion, Calendar, Checkbox } from '@rappi-ds/react'
import { Bike, Store } from '@rappi-ds/icons'
import type { ComponentDoc } from '../data/types'

export const contenidoDocs: ComponentDoc[] = [
  {
    slug: 'card',
    name: 'Card',
    category: 'Contenido',
    description:
      'Contenedor de superficie con tres niveles de elevación (flat, raised, floating). Acepta children y estilos; úsalo para agrupar contenido relacionado.',
    notes: [
      'flat solo dibuja un borde; raised y floating agregan sombra creciente.',
      'Card no aplica padding interno: defínelo con style o con la maquetación de su contenido.',
    ],
    examples: [
      {
        title: 'Elevaciones',
        description: 'flat para contenido sobre la página, raised sobre una superficie y floating para flotar por encima.',
        stack: true,
        code: `<Card elevation="flat" style={{ padding: 16 }}>
  Card flat — solo borde, sin sombra.
</Card>
<Card elevation="raised" style={{ padding: 16 }}>
  Card raised — sombra sutil sobre una superficie.
</Card>
<Card elevation="floating" style={{ padding: 16 }}>
  Card floating — sombra más marcada, flota sobre el contenido.
</Card>`,
        Demo: () => (
          <>
            <Card elevation="flat" style={{ padding: 16 }}>
              Card flat — solo borde, sin sombra.
            </Card>
            <Card elevation="raised" style={{ padding: 16 }}>
              Card raised — sombra sutil sobre una superficie.
            </Card>
            <Card elevation="floating" style={{ padding: 16 }}>
              Card floating — sombra más marcada, flota sobre el contenido.
            </Card>
          </>
        ),
      },
    ],
  },
  {
    slug: 'card-action',
    name: 'CardAction',
    category: 'Contenido',
    description:
      'Card seleccionable para listas de opciones, ajustes y onboarding. El click lo maneja la card; los slots (Checkbox, Radio, iconos) son espejos decorativos del estado.',
    notes: [
      'Pasa title siempre; description y showDescription controlan la línea secundaria.',
      'Los controles en leftSlot/rightSlot deben ser decorativos: usa readOnly y tabIndex={-1}.',
    ],
    examples: [
      {
        title: 'Lista seleccionable',
        description: 'Haz click en cada card para alternar la selección; el Checkbox refleja el estado.',
        stack: true,
        code: `const [selected, setSelected] = useState<string[]>(['express'])
const toggle = (id: string) =>
  setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

{options.map((o) => (
  <CardAction
    key={o.id}
    title={o.title}
    description={o.description}
    selected={selected.includes(o.id)}
    onClick={() => toggle(o.id)}
    leftSlot={<Checkbox checked={selected.includes(o.id)} readOnly tabIndex={-1} aria-hidden />}
  />
))}`,
        Demo: function CardActionListDemo() {
          const options = [
            { id: 'express', title: 'Entrega express', description: 'En menos de 30 minutos' },
            { id: 'standard', title: 'Entrega estándar', description: 'Hoy antes de las 8 p. m.' },
            { id: 'scheduled', title: 'Entrega programada', description: 'Elige día y franja horaria' },
          ]
          const [selected, setSelected] = useState<string[]>(['express'])
          const toggle = (id: string) =>
            setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
          return (
            <>
              {options.map((o) => (
                <CardAction
                  key={o.id}
                  title={o.title}
                  description={o.description}
                  selected={selected.includes(o.id)}
                  onClick={() => toggle(o.id)}
                  leftSlot={
                    <Checkbox checked={selected.includes(o.id)} readOnly tabIndex={-1} aria-hidden />
                  }
                />
              ))}
            </>
          )
        },
      },
    ],
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Contenido',
    description:
      'Encabezado expandible con título, subtítulo e icono opcionales. El panel (children) se revela al abrir; soporta modo controlado y no controlado.',
    notes: [
      'defaultOpen para el modo no controlado; usa open + onOpenChange para controlarlo.',
      'Si slotRight contiene controles interactivos, llama event.stopPropagation() para no alternar el panel.',
    ],
    examples: [
      {
        title: 'Abierto por defecto con subtítulo',
        stack: true,
        code: `<Accordion
  title="Detalles del pedido"
  subtitle="3 productos · entrega estimada 25 min"
  icon={<Store />}
  defaultOpen
>
  Tu pedido fue confirmado y la tienda ya lo está preparando. Recibirás una
  notificación cuando el repartidor esté en camino.
</Accordion>`,
        Demo: () => (
          <Accordion
            title="Detalles del pedido"
            subtitle="3 productos · entrega estimada 25 min"
            icon={<Store />}
            defaultOpen
          >
            Tu pedido fue confirmado y la tienda ya lo está preparando. Recibirás una
            notificación cuando el repartidor esté en camino.
          </Accordion>
        ),
      },
      {
        title: 'Cerrado por defecto',
        stack: true,
        code: `<Accordion title="Métodos de entrega" subtitle="Express, estándar o programada" icon={<Bike />}>
  Elige cómo quieres recibir tu pedido. Las opciones disponibles dependen de la
  tienda y de tu ubicación.
</Accordion>`,
        Demo: () => (
          <Accordion
            title="Métodos de entrega"
            subtitle="Express, estándar o programada"
            icon={<Bike />}
          >
            Elige cómo quieres recibir tu pedido. Las opciones disponibles dependen de la
            tienda y de tu ubicación.
          </Accordion>
        ),
      },
    ],
  },
  {
    slug: 'calendar',
    name: 'Calendar',
    category: 'Contenido',
    description:
      'Selector de fecha en variante single o double. Modo controlado con value + onChange o no controlado con defaultValue; admite minDate, maxDate y mes inicial.',
    notes: [
      'Para selección de rango usa rangeValue / onRangeChange en lugar de value / onChange.',
      'Acota las fechas seleccionables con minDate y maxDate.',
    ],
    examples: [
      {
        title: 'Selección de una fecha',
        description: 'Modo controlado: la fecha elegida se guarda en estado.',
        stack: true,
        code: `const [date, setDate] = useState<Date | null>(null)

<Calendar value={date} onChange={setDate} />
<p>Fecha seleccionada: {date ? date.toLocaleDateString('es-CO') : 'ninguna'}</p>`,
        Demo: function CalendarSingleDemo() {
          const [date, setDate] = useState<Date | null>(null)
          return (
            <>
              <Calendar value={date} onChange={setDate} />
              <p style={{ margin: 0 }}>
                Fecha seleccionada: {date ? date.toLocaleDateString('es-CO') : 'ninguna'}
              </p>
            </>
          )
        },
      },
    ],
  },
]
