import { useState } from 'react'
import { Button, IconButton, Chip } from '@rappi-ds/react'
import { Plus, ArrowRight, Download, Heart, Share2, Trash2 } from '@rappi-ds/icons'
import type { ComponentDoc } from '../data/types'

export const accionesDocs: ComponentDoc[] = [
  {
    slug: 'button',
    name: 'Button',
    category: 'Acciones',
    description:
      'Botón de acción con tres apariencias (primary, secondary, tertiary), cinco tamaños, estado de carga e iconos opcionales al inicio o al final.',
    notes: [
      'Usa loading solo para acciones asíncronas; mientras está activo el botón se deshabilita.',
      'startIcon y endIcon son mutuamente excluyentes.',
    ],
    examples: [
      {
        title: 'Apariencias',
        description: 'primary para la acción principal, secondary y tertiary para acciones de menor jerarquía.',
        code: `<Button appearance="primary">Primary</Button>
<Button appearance="secondary">Secondary</Button>
<Button appearance="tertiary">Tertiary</Button>`,
        Demo: () => (
          <>
            <Button appearance="primary">Primary</Button>
            <Button appearance="secondary">Secondary</Button>
            <Button appearance="tertiary">Tertiary</Button>
          </>
        ),
      },
      {
        title: 'Tamaños',
        code: `<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="md">MD</Button>
<Button size="lg">LG</Button>
<Button size="xl">XL</Button>`,
        Demo: () => (
          <>
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="md">MD</Button>
            <Button size="lg">LG</Button>
            <Button size="xl">XL</Button>
          </>
        ),
      },
      {
        title: 'Iconos, carga y deshabilitado',
        code: `<Button appearance="primary" startIcon={<Plus />}>Crear</Button>
<Button appearance="secondary" endIcon={<ArrowRight />}>Siguiente</Button>
<Button appearance="primary" loading>Guardando</Button>
<Button appearance="primary" disabled>Deshabilitado</Button>`,
        Demo: () => (
          <>
            <Button appearance="primary" startIcon={<Plus />}>
              Crear
            </Button>
            <Button appearance="secondary" endIcon={<ArrowRight />}>
              Siguiente
            </Button>
            <Button appearance="primary" loading>
              Guardando
            </Button>
            <Button appearance="primary" disabled>
              Deshabilitado
            </Button>
          </>
        ),
      },
    ],
  },
  {
    slug: 'icon-button',
    name: 'IconButton',
    category: 'Acciones',
    description:
      'Acción compacta de solo icono. Requiere un aria-label explícito porque no tiene texto visible. Comparte apariencias y tamaños con Button.',
    examples: [
      {
        title: 'Apariencias',
        code: `<IconButton appearance="primary" icon={<Heart />} aria-label="Favorito" />
<IconButton appearance="secondary" icon={<Share2 />} aria-label="Compartir" />
<IconButton appearance="tertiary" icon={<Trash2 />} aria-label="Eliminar" />`,
        Demo: () => (
          <>
            <IconButton appearance="primary" icon={<Heart />} aria-label="Favorito" />
            <IconButton appearance="secondary" icon={<Share2 />} aria-label="Compartir" />
            <IconButton appearance="tertiary" icon={<Trash2 />} aria-label="Eliminar" />
          </>
        ),
      },
      {
        title: 'Tamaños',
        code: `<IconButton size="sm" icon={<Plus />} aria-label="Agregar" />
<IconButton size="md" icon={<Plus />} aria-label="Agregar" />
<IconButton size="lg" icon={<Plus />} aria-label="Agregar" />`,
        Demo: () => (
          <>
            <IconButton size="sm" icon={<Plus />} aria-label="Agregar" />
            <IconButton size="md" icon={<Plus />} aria-label="Agregar" />
            <IconButton size="lg" icon={<Plus />} aria-label="Agregar" />
          </>
        ),
      },
    ],
  },
  {
    slug: 'chip',
    name: 'Chip',
    category: 'Acciones',
    description:
      'Píldora interactiva para filtros, tags y selecciones tipo tab. Renderiza un <button> con aria-pressed y admite icono, badge y estado seleccionado.',
    examples: [
      {
        title: 'Filtros seleccionables',
        description: 'Haz click para alternar la selección de cada chip.',
        code: `const [sel, setSel] = useState(['todos'])
const toggle = (v) => setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]))

{options.map((o) => (
  <Chip key={o} selected={sel.includes(o)} onClick={() => toggle(o)}>
    {o}
  </Chip>
))}`,
        Demo: function ChipFilterDemo() {
          const options = ['todos', 'comida', 'mercado', 'farmacia']
          const [sel, setSel] = useState<string[]>(['todos'])
          const toggle = (v: string) =>
            setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]))
          return (
            <>
              {options.map((o) => (
                <Chip key={o} selected={sel.includes(o)} onClick={() => toggle(o)}>
                  {o}
                </Chip>
              ))}
            </>
          )
        },
      },
      {
        title: 'Variantes, icono y badge',
        code: `<Chip variant="filled" selected startIcon={<Download />}>Descargas</Chip>
<Chip variant="outline" badge={3}>Notificaciones</Chip>
<Chip variant="outline" size="lg">Tamaño lg</Chip>`,
        Demo: () => (
          <>
            <Chip variant="filled" selected startIcon={<Download />}>
              Descargas
            </Chip>
            <Chip variant="outline" badge={3}>
              Notificaciones
            </Chip>
            <Chip variant="outline" size="lg">
              Tamaño lg
            </Chip>
          </>
        ),
      },
    ],
  },
]
