import { tokens } from '@rappi-ds/tokens'
import {
  COLOR_TOKEN_CATEGORIES,
  ELEVATION_TOKENS,
  RADIUS_TOKENS,
  SPACING_TOKENS,
} from '../data/tokenCategories'
import { usePortalTheme } from '../theme/ThemeContext'

function ColorSwatch({ name, varRef }: { name: string; varRef: string }) {
  return (
    <div className="swatch">
      <span className="swatch__chip" style={{ backgroundColor: varRef }} />
      <div>
        <div className="swatch__name">{name}</div>
        <div className="swatch__var">{varRef}</div>
      </div>
    </div>
  )
}

export function TokensPage() {
  const { theme } = usePortalTheme()
  const colorCount = Object.keys(tokens.colors).length

  return (
    <div className="content">
      <div className="page-head">
        <h1 className="page-title">Design tokens</h1>
        <p className="page-lead">
          Tokens semánticos expuestos por <code>@rappi-ds/tokens</code>, resueltos
          para el tema activo (<code>{theme}</code>). Cambia el tema en la barra
          superior para ver cómo se actualizan. Cada token es una variable CSS que
          puedes usar directamente o a través del objeto <code>tokens</code> en JS/TS.
        </p>
      </div>

      <nav className="token-nav" aria-label="Categorías de tokens">
        {COLOR_TOKEN_CATEGORIES.map((category) => (
          <a key={category.id} href={`#${category.id}`} className="token-nav__link">
            {category.title}
          </a>
        ))}
        <a href="#spacing" className="token-nav__link">
          Spacing
        </a>
        <a href="#radius" className="token-nav__link">
          Radius
        </a>
        <a href="#elevation" className="token-nav__link">
          Elevation
        </a>
      </nav>

      <h2 className="section-title">Color · {colorCount} tokens</h2>

      {COLOR_TOKEN_CATEGORIES.map((category) => (
        <section className="token-category" id={category.id} key={category.id}>
          <div className="token-category__head">
            <h3 className="token-category__title">{category.title}</h3>
            <p className="token-category__desc">{category.description}</p>
          </div>
          <div className="swatch-grid">
            {category.keys.map((key) => (
              <ColorSwatch key={key} name={key} varRef={tokens.colors[key]} />
            ))}
          </div>
        </section>
      ))}

      <section className="token-category" id="spacing">
        <div className="token-category__head">
          <h3 className="token-category__title">Spacing</h3>
          <p className="token-category__desc">
            Escala de espaciado para padding, margin y gap.
          </p>
        </div>
        <div className="scale-list">
          {SPACING_TOKENS.map(([name, varRef]) => (
            <div className="scale-item" key={name}>
              <div className="scale-item__meta">
                <div className="scale-item__name">{name}</div>
                <div className="scale-item__var">{varRef}</div>
              </div>
              <div className="scale-item__preview scale-item__preview--spacing">
                <span style={{ width: varRef }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="token-category" id="radius">
        <div className="token-category__head">
          <h3 className="token-category__title">Radius</h3>
          <p className="token-category__desc">Border radius para contenedores y controles.</p>
        </div>
        <div className="scale-list scale-list--grid">
          {RADIUS_TOKENS.map(([name, varRef]) => (
            <div className="scale-item scale-item--card" key={name}>
              <div
                className="scale-item__preview scale-item__preview--radius"
                style={{ borderRadius: varRef }}
              />
              <div className="scale-item__name">{name}</div>
              <div className="scale-item__var">{varRef}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="token-category" id="elevation">
        <div className="token-category__head">
          <h3 className="token-category__title">Elevation</h3>
          <p className="token-category__desc">Sombras para profundidad y jerarquía visual.</p>
        </div>
        <div className="scale-list scale-list--grid">
          {ELEVATION_TOKENS.map(([name, varRef]) => (
            <div className="scale-item scale-item--card" key={name}>
              <div
                className="scale-item__preview scale-item__preview--elevation"
                style={{ boxShadow: varRef }}
              />
              <div className="scale-item__name">{name}</div>
              <div className="scale-item__var">{varRef}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
