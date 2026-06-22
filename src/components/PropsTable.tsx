import propsData from '../data/props.generated.json'

interface PropRow {
  name: string
  type: string
  required: boolean
  description: string
  defaultValue: string
}

const data = propsData as Record<string, PropRow[]>

export function PropsTable({ component }: { component: string }) {
  const rows = data[component] ?? []

  if (rows.length === 0) {
    return (
      <p className="muted">
        <code>{component}</code> no define props propias del design system: hereda los
        atributos nativos de su elemento HTML (por ejemplo <code>onClick</code>,{' '}
        <code>className</code>, <code>disabled</code>…).
      </p>
    )
  }

  return (
    <div className="props-scroll" tabIndex={0} aria-label={`Props de ${component}`}>
      <table className="props">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Tipo</th>
            <th>Default</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="prop-name">
                {row.name}
                {row.required && <span className="req" title="Requerida">REQ</span>}
              </td>
              <td className="prop-type">
                <code>{row.type}</code>
              </td>
              <td className="prop-default">
                {row.defaultValue ? <code>{row.defaultValue}</code> : <span className="muted">—</span>}
              </td>
              <td className="prop-desc">{row.description || <span className="muted">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
