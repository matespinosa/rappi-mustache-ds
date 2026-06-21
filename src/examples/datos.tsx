import { useState } from 'react'
import { DataTable, CardTable, TableCell, TableHeaderCell, Tag } from '@rappi-ds/react'
import type { DataTableColumn } from '@rappi-ds/react'
import type { ComponentDoc } from '../data/types'

interface Pedido {
  id: string
  tienda: string
  total: string
  estado: string
}

const pedidos: Pedido[] = [
  { id: 'P-1001', tienda: 'Frutería Central', total: '$32.400', estado: 'Entregado' },
  { id: 'P-1002', tienda: 'Farmacia La Rebaja', total: '$18.900', estado: 'En camino' },
  { id: 'P-1003', tienda: 'Mercado Express', total: '$54.100', estado: 'Pendiente' },
  { id: 'P-1004', tienda: 'Café del Parque', total: '$9.500', estado: 'Cancelado' },
]

const estadoIntent = (estado: string): 'success' | 'info' | 'warning' | 'error' => {
  if (estado === 'Entregado') return 'success'
  if (estado === 'En camino') return 'info'
  if (estado === 'Pendiente') return 'warning'
  return 'error'
}

const pedidoColumns: DataTableColumn<Pedido>[] = [
  { id: 'id', header: 'Pedido', renderCell: (r) => r.id },
  { id: 'tienda', header: 'Tienda', renderCell: (r) => r.tienda },
  { id: 'total', header: 'Total', align: 'end', renderCell: (r) => r.total },
  {
    id: 'estado',
    header: 'Estado',
    renderCell: (r) => (
      <Tag intent={estadoIntent(r.estado)} variant="pastel" size="sm">
        {r.estado}
      </Tag>
    ),
  },
]

export const datosDocs: ComponentDoc[] = [
  {
    slug: 'data-table',
    name: 'DataTable',
    category: 'Datos',
    description:
      'Tabla de datos responsiva: renderiza una tabla semántica en desktop y deriva un CardTable por fila en móvil a partir de las mismas columnas. Cada columna define cómo renderizar su celda y admite alineación, ancho y paginación.',
    propsKeys: ['DataTable'],
    notes: [
      'rows, columns y getRowId son obligatorios; getRowId debe devolver un identificador único por fila.',
      'renderCell puede devolver texto plano o cualquier componente del DS, como un Tag para representar estados.',
      'Usa ariaLabel o caption para dar un nombre accesible a la tabla.',
    ],
    examples: [
      {
        title: 'Tabla con estados',
        description: 'La columna "Estado" renderiza un Tag con la intención según el valor de la fila.',
        stack: true,
        code: `interface Pedido {
  id: string
  tienda: string
  total: string
  estado: string
}

const columns: DataTableColumn<Pedido>[] = [
  { id: 'id', header: 'Pedido', renderCell: (r) => r.id },
  { id: 'tienda', header: 'Tienda', renderCell: (r) => r.tienda },
  { id: 'total', header: 'Total', align: 'end', renderCell: (r) => r.total },
  {
    id: 'estado',
    header: 'Estado',
    renderCell: (r) => (
      <Tag intent="success" variant="pastel" size="sm">{r.estado}</Tag>
    ),
  },
]

<DataTable
  rows={pedidos}
  columns={columns}
  getRowId={(r) => r.id}
  ariaLabel="Pedidos recientes"
/>`,
        Demo: () => (
          <DataTable
            rows={pedidos}
            columns={pedidoColumns}
            getRowId={(r) => r.id}
            ariaLabel="Pedidos recientes"
          />
        ),
      },
      {
        title: 'Con paginación',
        description: 'page, totalPages y onPageChange se controlan con estado en el componente padre.',
        stack: true,
        code: `function PedidosPaginados() {
  const [page, setPage] = useState(1)
  return (
    <DataTable
      rows={pedidos}
      columns={columns}
      getRowId={(r) => r.id}
      ariaLabel="Pedidos paginados"
      pagination={{ page, totalPages: 5, onPageChange: setPage }}
    />
  )
}`,
        Demo: function PedidosPaginadosDemo() {
          const [page, setPage] = useState(1)
          return (
            <DataTable
              rows={pedidos}
              columns={pedidoColumns}
              getRowId={(r) => r.id}
              ariaLabel="Pedidos paginados"
              pagination={{ page, totalPages: 5, onPageChange: setPage }}
            />
          )
        },
      },
    ],
  },
  {
    slug: 'card-table',
    name: 'CardTable',
    category: 'Datos',
    description:
      'Representación móvil presentacional de una fila de datos. No es clickable; las acciones deben ser controles explícitos. Compone un título, meta, estado y una lista de campos label/value.',
    propsKeys: ['CardTable'],
    notes: [
      'title es obligatorio; meta, status y fields son opcionales.',
      'Cada campo lleva un id único; usa emphasis="strong" para resaltar un valor sin codificar un estado de negocio.',
    ],
    examples: [
      {
        title: 'Resumen de pedido',
        description: 'title, meta con un Tag de estado y varios campos de detalle.',
        stack: true,
        code: `<CardTable
  title="Pedido P-1002"
  meta={<Tag intent="info" variant="pastel" size="sm">En camino</Tag>}
  fields={[
    { id: 'tienda', label: 'Tienda', value: 'Farmacia La Rebaja' },
    { id: 'total', label: 'Total', value: '$18.900', emphasis: 'strong' },
    { id: 'pago', label: 'Pago', value: 'Tarjeta •••• 4242' },
    { id: 'eta', label: 'Entrega estimada', value: '25 min' },
  ]}
/>`,
        Demo: () => (
          <CardTable
            title="Pedido P-1002"
            meta={
              <Tag intent="info" variant="pastel" size="sm">
                En camino
              </Tag>
            }
            fields={[
              { id: 'tienda', label: 'Tienda', value: 'Farmacia La Rebaja' },
              { id: 'total', label: 'Total', value: '$18.900', emphasis: 'strong' },
              { id: 'pago', label: 'Pago', value: 'Tarjeta •••• 4242' },
              { id: 'eta', label: 'Entrega estimada', value: '25 min' },
            ]}
          />
        ),
      },
    ],
  },
  {
    slug: 'table-cell',
    name: 'TableCell',
    category: 'Datos',
    description:
      'Celdas nativas de tabla. TableHeaderCell es el encabezado de columna y TableCell la celda de datos. Deben renderizarse dentro de un <table> real con sus <tr>; admiten leading, title, trailing y alineación lógica.',
    importNames: ['TableCell', 'TableHeaderCell'],
    propsKeys: ['TableCell', 'TableHeaderCell'],
    notes: [
      'TableCell y TableHeaderCell deben vivir dentro de un <tr> dentro de un <table>.',
      'title es el contenido principal de texto; leading y trailing son slots opcionales antes y después.',
    ],
    examples: [
      {
        title: 'Tabla de productos',
        description: 'Encabezados con TableHeaderCell y filas de datos con TableCell.',
        stack: true,
        code: `<table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <TableHeaderCell title="Producto" />
      <TableHeaderCell title="Categoría" />
      <TableHeaderCell title="Precio" align="end" />
    </tr>
  </thead>
  <tbody>
    <tr>
      <TableCell title="Café molido" />
      <TableCell title="Bebidas" />
      <TableCell title="$12.000" align="end" />
    </tr>
    <tr>
      <TableCell title="Pan integral" />
      <TableCell title="Panadería" />
      <TableCell title="$6.500" align="end" />
    </tr>
  </tbody>
</table>`,
        Demo: () => (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <TableHeaderCell title="Producto" />
                <TableHeaderCell title="Categoría" />
                <TableHeaderCell title="Precio" align="end" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell title="Café molido" />
                <TableCell title="Bebidas" />
                <TableCell title="$12.000" align="end" />
              </tr>
              <tr>
                <TableCell title="Pan integral" />
                <TableCell title="Panadería" />
                <TableCell title="$6.500" align="end" />
              </tr>
              <tr>
                <TableCell title="Leche entera" />
                <TableCell title="Lácteos" />
                <TableCell title="$4.200" align="end" />
              </tr>
            </tbody>
          </table>
        ),
      },
    ],
  },
]
