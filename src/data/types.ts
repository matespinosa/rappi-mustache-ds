import type { ComponentType } from 'react'

/** Functional groups used for the sidebar navigation, in display order. */
export const CATEGORY_ORDER = [
  'Acciones',
  'Formularios',
  'Navegación',
  'Feedback',
  'Overlays',
  'Contenido',
  'Datos',
  'Sistema',
] as const

export type ComponentCategory = (typeof CATEGORY_ORDER)[number]

export interface ComponentExample {
  /** Short title shown above the live demo. */
  title: string
  /** Optional one-line explanation of what the example shows. */
  description?: string
  /** Source code shown in the snippet — kept in sync with `Demo`. */
  code: string
  /** Live, interactive demo. A component so it may use hooks (useState, …). */
  Demo: ComponentType
  /** Lay the preview out vertically with extra room (forms, overlays, …). */
  stack?: boolean
}

export interface ComponentDoc {
  /** URL slug, e.g. "button". */
  slug: string
  /** Primary display + export name, e.g. "Button". */
  name: string
  category: ComponentCategory
  /** One-paragraph summary shown under the title. */
  description: string
  /** Import line shown at the top of the page. Defaults to the component name. */
  importNames?: string[]
  /** Props-table keys to render (defaults to `[name]`). Use for component families. */
  propsKeys?: string[]
  /** Usage notes rendered as a bulleted list. */
  notes?: string[]
  examples: ComponentExample[]
}
