import { useState } from 'react'
import { Button, Dialog, BottomSheet, Drawer } from '@rappi-ds/react'
import type { ComponentDoc } from '../data/types'

export const overlaysDocs: ComponentDoc[] = [
  {
    slug: 'dialog',
    name: 'Dialog',
    category: 'Overlays',
    propsKeys: ['Dialog'],
    description:
      'Modal centrado para confirmaciones y decisiones puntuales. Controlado por open, atrapa el foco y bloquea el scroll de fondo mientras está abierto.',
    notes: [
      'Siempre provee title; description y children son opcionales para el cuerpo.',
      'Activa showFooter para mostrar las acciones primaryLabel y secondaryLabel.',
    ],
    examples: [
      {
        title: 'Confirmación con footer',
        description: 'Abre el diálogo desde el botón y confírmalo o ciérralo desde sus acciones.',
        stack: true,
        code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Abrir diálogo</Button>
<Dialog
  open={open}
  title="¿Eliminar el producto?"
  description="Esta acción no se puede deshacer."
  showFooter
  primaryLabel="Eliminar"
  secondaryLabel="Cancelar"
  onPrimary={() => setOpen(false)}
  onSecondary={() => setOpen(false)}
  onClose={() => setOpen(false)}
/>`,
        Demo: function DialogDemo() {
          const [open, setOpen] = useState(false)
          return (
            <>
              <Button onClick={() => setOpen(true)}>Abrir diálogo</Button>
              <Dialog
                open={open}
                title="¿Eliminar el producto?"
                description="Esta acción no se puede deshacer."
                showFooter
                primaryLabel="Eliminar"
                secondaryLabel="Cancelar"
                onPrimary={() => setOpen(false)}
                onSecondary={() => setOpen(false)}
                onClose={() => setOpen(false)}
              />
            </>
          )
        },
      },
    ],
  },
  {
    slug: 'bottom-sheet',
    name: 'BottomSheet',
    category: 'Overlays',
    propsKeys: ['BottomSheet'],
    description:
      'Panel modal anclado al borde inferior, ideal para móvil. Controlado por open, soporta grabber para arrastrar y tres tamaños de alto.',
    notes: [
      'size define el alto: hug se ajusta al contenido, half ocupa la mitad y full casi toda la pantalla.',
      'Activa showFooter para mostrar las acciones primaryLabel y secondaryLabel.',
    ],
    examples: [
      {
        title: 'Tamaño hug con footer',
        description: 'Se ajusta al contenido y muestra una acción principal y secundaria.',
        stack: true,
        code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Abrir bottom sheet</Button>
<BottomSheet
  open={open}
  title="Filtrar resultados"
  size="hug"
  grabber
  showFooter
  primaryLabel="Aplicar"
  secondaryLabel="Limpiar"
  onPrimary={() => setOpen(false)}
  onSecondary={() => setOpen(false)}
  onClose={() => setOpen(false)}
>
  Selecciona tus preferencias de entrega.
</BottomSheet>`,
        Demo: function BottomSheetHugDemo() {
          const [open, setOpen] = useState(false)
          return (
            <>
              <Button onClick={() => setOpen(true)}>Abrir bottom sheet</Button>
              <BottomSheet
                open={open}
                title="Filtrar resultados"
                size="hug"
                grabber
                showFooter
                primaryLabel="Aplicar"
                secondaryLabel="Limpiar"
                onPrimary={() => setOpen(false)}
                onSecondary={() => setOpen(false)}
                onClose={() => setOpen(false)}
              >
                Selecciona tus preferencias de entrega.
              </BottomSheet>
            </>
          )
        },
      },
      {
        title: 'Tamaño half',
        description: 'Ocupa la mitad de la pantalla para contenido más extenso.',
        stack: true,
        code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Abrir tamaño half</Button>
<BottomSheet
  open={open}
  title="Detalle del pedido"
  size="half"
  grabber
  onClose={() => setOpen(false)}
>
  Aquí va el resumen completo de tu pedido.
</BottomSheet>`,
        Demo: function BottomSheetHalfDemo() {
          const [open, setOpen] = useState(false)
          return (
            <>
              <Button onClick={() => setOpen(true)}>Abrir tamaño half</Button>
              <BottomSheet
                open={open}
                title="Detalle del pedido"
                size="half"
                grabber
                onClose={() => setOpen(false)}
              >
                Aquí va el resumen completo de tu pedido.
              </BottomSheet>
            </>
          )
        },
      },
    ],
  },
  {
    slug: 'drawer',
    name: 'Drawer',
    category: 'Overlays',
    propsKeys: ['Drawer'],
    description:
      'Contenedor modal anclado al borde derecho para tareas y formularios laterales. Controlado por open, atrapa el foco y bloquea el scroll de fondo.',
    notes: [
      'size define el ancho: sm (380px), md (480px) o lg (640px).',
      'Activa showFooter y showSecondaryAction para mostrar las acciones del pie.',
    ],
    examples: [
      {
        title: 'Tamaño md con footer',
        description: 'Abre el panel lateral y confírmalo o ciérralo desde sus acciones.',
        stack: true,
        code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Abrir drawer</Button>
<Drawer
  open={open}
  title="Editar dirección"
  size="md"
  closeLabel="Cerrar"
  showFooter
  showSecondaryAction
  primaryLabel="Guardar"
  secondaryLabel="Cancelar"
  onPrimary={() => setOpen(false)}
  onSecondary={() => setOpen(false)}
  onClose={() => setOpen(false)}
>
  Actualiza los datos de tu dirección de entrega.
</Drawer>`,
        Demo: function DrawerDemo() {
          const [open, setOpen] = useState(false)
          return (
            <>
              <Button onClick={() => setOpen(true)}>Abrir drawer</Button>
              <Drawer
                open={open}
                title="Editar dirección"
                size="md"
                closeLabel="Cerrar"
                showFooter
                showSecondaryAction
                primaryLabel="Guardar"
                secondaryLabel="Cancelar"
                onPrimary={() => setOpen(false)}
                onSecondary={() => setOpen(false)}
                onClose={() => setOpen(false)}
              >
                Actualiza los datos de tu dirección de entrega.
              </Drawer>
            </>
          )
        },
      },
    ],
  },
]
