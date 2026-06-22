import { Link } from 'react-router-dom'
import { Menu, X } from '@rappi-ds/icons'
import rappiLogo from '../assets/icons/brand/rappi.svg'
import moustacheLogo from '../assets/icons/brand/moustache-rappi.svg'
import { ThemeSwitcher } from './ThemeSwitcher'

interface TopbarProps {
  menuOpen: boolean
  onMenuToggle: () => void
}

export function Topbar({ menuOpen, onMenuToggle }: TopbarProps) {
  return (
    <header className="topbar">
      <button
        className="topbar__menu"
        type="button"
        aria-label={menuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
        aria-expanded={menuOpen}
        aria-controls="portal-sidebar"
        onClick={onMenuToggle}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <Link to="/" className="topbar__brand">
        <img src={rappiLogo} alt="Rappi" className="topbar__logo topbar__logo--desktop" />
        <img src={moustacheLogo} alt="Rappi" className="topbar__logo topbar__logo--mobile" />
        <span className="topbar__badge">@rappi-ds/react · v0.3.0</span>
      </Link>
      <div className="topbar__spacer" />
      <ThemeSwitcher />
    </header>
  )
}
