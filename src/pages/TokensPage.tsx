import { tokens } from '@rappi-ds/tokens'
import { usePortalTheme } from '../theme/ThemeContext'

export function TokensPage() {
  const { theme } = usePortalTheme()
  const colors = Object.entries(tokens.colors) as Array<[string, string]>

  return (
    <div className="content">
      <div className="page-head">
        <h1 className="page-title">Design tokens</h1>
        <p className="page-lead">
          Tokens semánticos de color expuestos por <code>@rappi-ds/tokens</code>,
          resueltos para el tema activo (<code>{theme}</code>). Cambia el tema en la barra
          superior para ver cómo se actualizan. Cada token es una variable CSS que puedes
          usar directamente o a través del objeto <code>tokens</code> en JS/TS.
        </p>
      </div>

      <h2 className="section-title">Color · {colors.length} tokens</h2>
      <div className="swatch-grid">
        {colors.map(([name, varRef]) => (
          <div className="swatch" key={name}>
            <span className="swatch__chip" style={{ backgroundColor: varRef }} />
            <div>
              <div className="swatch__name">{name}</div>
              <div className="swatch__var">{varRef}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
