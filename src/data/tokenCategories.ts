import { tokens } from '@rappi-ds/tokens'

type ColorTokenKey = keyof typeof tokens.colors

export interface ColorTokenCategory {
  id: string
  title: string
  description: string
  keys: ColorTokenKey[]
}

/** Semantic color groups — order matches @rappi-ds/tokens / Figma semantics. */
export const COLOR_TOKEN_CATEGORIES: ColorTokenCategory[] = [
  {
    id: 'brand',
    title: 'Marca',
    description: 'Identidad de marca y acentos primarios/secundarios.',
    keys: [
      'brandPrimary',
      'brandPrimaryDark',
      'brandPrimaryLight',
      'brandPrimaryContainer',
      'brandSecondary',
      'brandSecondaryDark',
    ],
  },
  {
    id: 'surface',
    title: 'Superficies',
    description: 'Fondos base para layouts, tarjetas y capas.',
    keys: [
      'surface',
      'surfaceMild',
      'surfaceWeak',
      'surfaceInverse',
      'surfaceInverseOn',
      'surfaceOverlay',
      'surfaceOverlayWeak',
      'surfaceDisabled',
      'surfaceOnTop',
      'surfaceAccentWeak',
    ],
  },
  {
    id: 'surface-states',
    title: 'Superficies · estados',
    description: 'Variantes hover y pressed para superficies interactivas.',
    keys: [
      'surfaceHover',
      'surfacePressed',
      'surfaceMildHover',
      'surfaceMildPressed',
      'surfaceWeakHover',
      'surfaceWeakPressed',
      'surfaceInverseHover',
      'surfaceInversePressed',
    ],
  },
  {
    id: 'ink',
    title: 'Ink',
    description: 'Color de texto, iconos y contenido tipográfico.',
    keys: [
      'inkStrong',
      'inkStrongOn',
      'inkStandard',
      'inkWeak',
      'inkDisabled',
      'inkInverse',
      'inkInverseOn',
      'inkAccent',
      'inkError',
      'inkWarning',
      'inkPositive',
      'inkRecommendation',
    ],
  },
  {
    id: 'accent',
    title: 'Accent · interactivo',
    description: 'Fondos y bordes de controles con acento de marca.',
    keys: [
      'bgAccent',
      'bgAccentHover',
      'bgAccentPressed',
      'borderAccent',
      'borderAccentFocus',
      'borderFocus',
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback',
    description: 'Estados semánticos: éxito, advertencia, error, info y ofertas.',
    keys: [
      'positive',
      'positiveContainer',
      'warning',
      'warningContainer',
      'error',
      'errorContainer',
      'info',
      'infoContainer',
      'offer',
      'offerContainer',
    ],
  },
  {
    id: 'border',
    title: 'Bordes',
    description: 'Separadores, contornos y bordes de estado.',
    keys: [
      'borderStandard',
      'borderStrong',
      'borderBlank',
      'borderBlock',
      'borderNonOpaque',
      'borderError',
      'borderWarning',
      'borderPositive',
    ],
  },
  {
    id: 'skeleton',
    title: 'Skeleton',
    description: 'Placeholders de carga.',
    keys: ['skeletonWeak', 'skeletonStandard'],
  },
  {
    id: 'programs',
    title: 'Programas',
    description: 'Identidad de programas Rappi.',
    keys: ['programsRappi', 'programsTurbo'],
  },
  {
    id: 'chart',
    title: 'Gráficos',
    description: 'Paleta para visualización de datos.',
    keys: [
      'chartBlue02',
      'chartBlue04',
      'chartGreen02',
      'chartGreen04',
      'chartRed02',
      'chartRed03',
      'chartRed04',
      'chartOrange02',
      'chartOrange03',
      'chartOrange04',
      'chartYellow02',
      'chartTeal01',
      'chartTeal02',
      'chartTeal03',
      'chartTeal04',
      'chartPurple02',
      'chartIndigo01',
      'chartIndigo02',
      'chartIndigo03',
      'chartIndigo04',
      'chartMagenta01',
      'chartMagenta02',
      'chartMagenta03',
      'chartMagenta04',
    ],
  },
]

export const SPACING_TOKENS = Object.entries(tokens.spacing)

export const RADIUS_TOKENS = Object.entries(tokens.radius)

export const ELEVATION_TOKENS = Object.entries(tokens.elevation)
