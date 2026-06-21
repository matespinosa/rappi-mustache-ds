import { CATEGORY_ORDER, type ComponentCategory, type ComponentDoc } from './types'
import { accionesDocs } from '../examples/acciones'
import { formulariosDocs } from '../examples/formularios'
import { navegacionDocs } from '../examples/navegacion'
import { feedbackDocs } from '../examples/feedback'
import { overlaysDocs } from '../examples/overlays'
import { contenidoDocs } from '../examples/contenido'
import { datosDocs } from '../examples/datos'
import { sistemaDocs } from '../examples/sistema'

export const allComponents: ComponentDoc[] = [
  ...accionesDocs,
  ...formulariosDocs,
  ...navegacionDocs,
  ...feedbackDocs,
  ...overlaysDocs,
  ...contenidoDocs,
  ...datosDocs,
  ...sistemaDocs,
].sort((a, b) => a.name.localeCompare(b.name))

export function getComponent(slug: string): ComponentDoc | undefined {
  return allComponents.find((c) => c.slug === slug)
}

export interface CategoryGroup {
  category: ComponentCategory
  items: ComponentDoc[]
}

export const componentsByCategory: CategoryGroup[] = CATEGORY_ORDER.map((category) => ({
  category,
  items: allComponents.filter((c) => c.category === category),
})).filter((group) => group.items.length > 0)
