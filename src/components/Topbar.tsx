import { Link } from 'react-router-dom'
import { ThemeSwitcher } from './ThemeSwitcher'

export function Topbar() {
  return (
    <header className="topbar">
      <Link to="/" className="topbar__brand">
        <span className="topbar__logo">R</span>
        Rappi Design System
        <span className="topbar__badge">@rappi-ds/react · v0.2.0</span>
      </Link>
      <div className="topbar__spacer" />
      <ThemeSwitcher />
    </header>
  )
}
