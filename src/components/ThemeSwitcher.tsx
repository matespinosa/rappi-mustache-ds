import { Select } from '@rappi-ds/react'
import {
  PORTAL_THEME_LABELS,
  usePortalTheme,
  type PortalThemeName,
} from '../theme/ThemeContext'

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = usePortalTheme()

  return (
    <div className="topbar__theme">
      <span className="topbar__theme-label">Tema</span>
      <Select
        size="sm"
        value={theme}
        onChange={(value) => setTheme(value as PortalThemeName)}
        options={themes.map((item) => ({
          value: item,
          label: PORTAL_THEME_LABELS[item],
        }))}
        aria-label="Seleccionar el tema de producto del design system"
      />
    </div>
  )
}
