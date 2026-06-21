import { Select } from '@rappi-ds/react'
import type { ThemeName } from '@rappi-ds/tokens'
import { usePortalTheme } from '../theme/ThemeContext'

function label(theme: ThemeName): string {
  return theme.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = usePortalTheme()

  return (
    <div className="topbar__theme">
      <span className="topbar__theme-label">Tema</span>
      <Select
        size="sm"
        value={theme}
        onChange={(value) => setTheme(value as ThemeName)}
        options={themes.map((t) => ({ value: t, label: label(t) }))}
        aria-label="Seleccionar el tema de producto del design system"
      />
    </div>
  )
}
