import { Link } from 'react-router-dom'
import { allComponents } from '../data/registry'
import { usePortalTheme } from '../theme/ThemeContext'
import { CodeBlock } from '../components/CodeBlock'

const INSTALL = 'pnpm add @rappi-ds/react @rappi-ds/tokens @rappi-ds/icons'

const SETUP = `// main.tsx
import '@rappi-ds/tokens/base.css'
import '@rappi-ds/react/styles.css'

import { ThemeProvider, Button } from '@rappi-ds/react'

export function App() {
  return (
    <ThemeProvider>
      <Button appearance="primary">Hola, Rappi</Button>
    </ThemeProvider>
  )
}`

export function HomePage() {
  const { themes } = usePortalTheme()

  return (
    <div className="content">
      <div className="page-head">
        <h1 className="page-title">Rappi Design System</h1>
        <p className="page-lead">
          Portal de documentación interactiva de <code>@rappi-ds/react</code>. Explora
          cada componente con ejemplos en vivo, su código y la tabla de props, y prueba
          cómo se ven con cualquiera de los temas de producto usando el selector de la
          barra superior.
        </p>
      </div>

      <div className="stat-row">
        <div className="stat">
          <span className="stat__num">{allComponents.length}</span>
          <span className="stat__label">componentes documentados</span>
        </div>
        <div className="stat">
          <span className="stat__num">{themes.length}</span>
          <span className="stat__label">temas de producto</span>
        </div>
        <div className="stat">
          <span className="stat__num">v0.3.0</span>
          <span className="stat__label">versión del paquete</span>
        </div>
      </div>

      <h2 className="section-title">Instalación</h2>
      <CodeBlock standalone code={INSTALL} />

      <h2 className="section-title">Setup mínimo</h2>
      <CodeBlock standalone code={SETUP} />

      <h2 className="section-title">Componentes</h2>
      <div className="home-grid">
        {allComponents.map((c) => (
          <Link key={c.slug} to={`/components/${c.slug}`} className="home-card">
            <p className="home-card__name">{c.name}</p>
            <span className="home-card__cat">{c.category}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
