import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Search } from '@rappi-ds/react'
import { componentsByCategory } from '../data/registry'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'sidebar__link is-active' : 'sidebar__link'

export function Sidebar() {
  const [query, setQuery] = useState('')

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return componentsByCategory
    return componentsByCategory
      .map((g) => ({
        category: g.category,
        items: g.items.filter((c) => c.name.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0)
  }, [query])

  return (
    <nav id="portal-sidebar" className="sidebar" aria-label="Componentes">
      <div className="sidebar__search">
        <Search
          size="sm"
          placeholder="Buscar componente"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery('')}
        />
      </div>

      <NavLink to="/" end className={linkClass}>
        Inicio
      </NavLink>
      <NavLink to="/foundations/tokens" className={linkClass}>
        Design tokens
      </NavLink>

      {groups.map((group) => (
        <div className="sidebar__group" key={group.category}>
          <div className="sidebar__group-label">{group.category}</div>
          {group.items.map((c) => (
            <NavLink key={c.slug} to={`/components/${c.slug}`} className={linkClass}>
              {c.name}
            </NavLink>
          ))}
        </div>
      ))}

      {groups.length === 0 && (
        <p className="sidebar__empty">Sin resultados para “{query}”.</p>
      )}
    </nav>
  )
}
