import { useState } from 'react'
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Breadcrumb,
  Pagination,
  SegmentedControl,
  SegmentedOption,
} from '@rappi-ds/react'
import { Home, Package, Settings, LayoutGrid, List } from '@rappi-ds/icons'
import type { ComponentDoc } from '../data/types'

export const navegacionDocs: ComponentDoc[] = [
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Navegación',
    importNames: ['Tabs', 'TabList', 'Tab', 'TabPanel'],
    propsKeys: ['Tabs', 'TabList', 'Tab', 'TabPanel'],
    description:
      'Pestañas controladas para alternar entre secciones de contenido. Tabs es el contexto raíz que envuelve un TabList con sus Tab y un TabPanel por pestaña. Implementa el patrón ARIA tablist con navegación por teclado.',
    notes: [
      'Tabs es controlado: provee value y onChange para sincronizar la pestaña activa.',
      'Cada Tab y su TabPanel deben compartir el mismo value.',
      'TabList admite aria-label cuando no hay un encabezado visible cercano.',
      'Tab puede deshabilitarse con disabled y mostrar startIcon o endIcon.',
    ],
    examples: [
      {
        title: 'Pestañas controladas',
        description: 'Selecciona una pestaña para mostrar su panel asociado.',
        stack: true,
        code: `const [tab, setTab] = useState('resumen')

<Tabs value={tab} onChange={setTab}>
  <TabList aria-label="Secciones de la tienda">
    <Tab value="resumen" startIcon={<Home />}>Resumen</Tab>
    <Tab value="pedidos" startIcon={<Package />}>Pedidos</Tab>
    <Tab value="ajustes" startIcon={<Settings />} disabled>Ajustes</Tab>
  </TabList>
  <TabPanel value="resumen">Vista general de tu tienda.</TabPanel>
  <TabPanel value="pedidos">Pedidos activos del día.</TabPanel>
  <TabPanel value="ajustes">Configuración de la tienda.</TabPanel>
</Tabs>`,
        Demo: function TabsDemo() {
          const [tab, setTab] = useState('resumen')
          return (
            <Tabs value={tab} onChange={setTab}>
              <TabList aria-label="Secciones de la tienda">
                <Tab value="resumen" startIcon={<Home />}>
                  Resumen
                </Tab>
                <Tab value="pedidos" startIcon={<Package />}>
                  Pedidos
                </Tab>
                <Tab value="ajustes" startIcon={<Settings />} disabled>
                  Ajustes
                </Tab>
              </TabList>
              <TabPanel value="resumen">Vista general de tu tienda.</TabPanel>
              <TabPanel value="pedidos">Pedidos activos del día.</TabPanel>
              <TabPanel value="ajustes">Configuración de la tienda.</TabPanel>
            </Tabs>
          )
        },
      },
    ],
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Navegación',
    propsKeys: ['Breadcrumb'],
    description:
      'Landmark de navegación que muestra la ubicación del usuario dentro de la jerarquía de la página. El último item siempre es la página actual y se renderiza sin enlace, con aria-current="page".',
    notes: [
      'El último item de items es la página actual: omite su href.',
      'Los items previos se renderizan como enlaces (href) o botones (onClick).',
      'Cuando hay 2 o más items se muestra un botón de retroceso; usa onBack para controlarlo.',
    ],
    examples: [
      {
        title: 'Ruta de navegación',
        stack: true,
        code: `<Breadcrumb
  items={[
    { label: 'Inicio', href: '/' },
    { label: 'Tiendas', href: '/tiendas' },
    { label: 'Mi tienda' },
  ]}
  onBack={() => {}}
/>`,
        Demo: () => (
          <Breadcrumb
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Tiendas', href: '/tiendas' },
              { label: 'Mi tienda' },
            ]}
            onBack={() => {}}
          />
        ),
      },
    ],
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    category: 'Navegación',
    propsKeys: ['Pagination'],
    description:
      'Control de paginación 1-indexado para recorrer páginas de resultados. Recibe la página actual y el total de páginas, y notifica el cambio con onPageChange.',
    notes: [
      'page es 1-indexado y totalPages define el rango disponible.',
      'onPageChange recibe la nueva página seleccionada por el usuario.',
    ],
    examples: [
      {
        title: 'Páginas de resultados',
        description: 'Navega entre páginas para actualizar la página activa.',
        code: `const [page, setPage] = useState(1)

<Pagination page={page} totalPages={8} onPageChange={setPage} />`,
        Demo: function PaginationDemo() {
          const [page, setPage] = useState(1)
          return <Pagination page={page} totalPages={8} onPageChange={setPage} />
        },
      },
    ],
  },
  {
    slug: 'segmented-control',
    name: 'SegmentedControl',
    category: 'Navegación',
    importNames: ['SegmentedControl', 'SegmentedOption'],
    propsKeys: ['SegmentedControl', 'SegmentedOption'],
    description:
      'Control segmentado de selección única en forma de píldora para alternar entre 2 y 4 vistas o filtros. La selección activa se anima con un thumb deslizante. Implementa el patrón ARIA radiogroup.',
    notes: [
      'aria-label es obligatorio para describir el grupo a lectores de pantalla.',
      'Es controlado: provee value y onChange para sincronizar la opción activa.',
      'SegmentedOption admite startIcon, endIcon y disabled.',
    ],
    examples: [
      {
        title: 'Cambio de vista',
        description: 'Alterna entre las vistas disponibles del listado.',
        code: `const [view, setView] = useState('grid')

<SegmentedControl value={view} onChange={setView} aria-label="Vista del listado">
  <SegmentedOption value="grid" startIcon={<LayoutGrid />}>Cuadrícula</SegmentedOption>
  <SegmentedOption value="list" startIcon={<List />}>Lista</SegmentedOption>
</SegmentedControl>`,
        Demo: function SegmentedControlDemo() {
          const [view, setView] = useState('grid')
          return (
            <SegmentedControl value={view} onChange={setView} aria-label="Vista del listado">
              <SegmentedOption value="grid" startIcon={<LayoutGrid />}>
                Cuadrícula
              </SegmentedOption>
              <SegmentedOption value="list" startIcon={<List />}>
                Lista
              </SegmentedOption>
            </SegmentedControl>
          )
        },
      },
      {
        title: 'Rango de tiempo',
        code: `const [range, setRange] = useState('week')

<SegmentedControl value={range} onChange={setRange} aria-label="Rango de tiempo">
  <SegmentedOption value="day">Hoy</SegmentedOption>
  <SegmentedOption value="week">Semana</SegmentedOption>
  <SegmentedOption value="month">Mes</SegmentedOption>
</SegmentedControl>`,
        Demo: function SegmentedRangeDemo() {
          const [range, setRange] = useState('week')
          return (
            <SegmentedControl value={range} onChange={setRange} aria-label="Rango de tiempo">
              <SegmentedOption value="day">Hoy</SegmentedOption>
              <SegmentedOption value="week">Semana</SegmentedOption>
              <SegmentedOption value="month">Mes</SegmentedOption>
            </SegmentedControl>
          )
        },
      },
    ],
  },
]
