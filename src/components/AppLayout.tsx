import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Topbar } from './Topbar'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <div className={menuOpen ? 'app app--menu-open' : 'app'}>
      <Topbar menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} />
      <div className="body">
        <Sidebar />
        <button
          className="sidebar-scrim"
          type="button"
          aria-label="Cerrar navegación"
          onClick={() => setMenuOpen(false)}
        />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
