import { ThemeProvider, Button, Card } from '@rappi-ds/react'
import type { ComponentDoc } from '../data/types'

export const sistemaDocs: ComponentDoc[] = [
  {
    slug: 'theme-provider',
    name: 'ThemeProvider',
    category: 'Sistema',
    description:
      'Proveedor requerido que activa el tema del design system mediante el atributo data-theme. Usa display:contents, por lo que es invisible para layouts flex/grid. Importa base.css y el CSS del tema antes de usarlo.',
    notes: [
      'Todo este portal ya está envuelto en un ThemeProvider; el selector de la barra superior cambia su prop theme en vivo.',
      'Puedes anidar ThemeProvider para aplicar un tema distinto a una sección concreta.',
      'Temas disponibles: food, grocery, pharmacy, turbo, fintech, pay, user-app, rt-app, nitro, consumer-cms, aliados, portal-partners, brands, mi-tienda, nexus, marketing-suite, cargo.',
    ],
    examples: [
      {
        title: 'Theme scoping anidado',
        description:
          'Una sección forzada al tema "fintech" dentro del árbol que usa el tema global del portal.',
        stack: true,
        code: `<ThemeProvider theme="fintech">
  <Card elevation="raised">
    <Button appearance="primary">Acción con tema fintech</Button>
  </Card>
</ThemeProvider>`,
        Demo: () => (
          <ThemeProvider theme="fintech">
            <Card elevation="raised" style={{ padding: 20, display: 'flex', gap: 12 }}>
              <Button appearance="primary">Acción fintech</Button>
              <Button appearance="secondary">Secundaria</Button>
            </Card>
          </ThemeProvider>
        ),
      },
    ],
  },
]
