import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react'
import { ThemeProvider } from '@rappi-ds/react'
import type { ThemeName } from '@rappi-ds/tokens'

export const PORTAL_THEMES = [
  'merchants',
  'user-app',
  'rt-app',
  'nitro',
  'consumer-cms',
  'aliados',
  'portal-partners',
  'brands',
  'mi-tienda',
  'nexus',
  'marketing-suite',
  'cargo',
] as const

export type PortalThemeName = (typeof PORTAL_THEMES)[number]

export const PORTAL_THEME_LABELS: Record<PortalThemeName, string> = {
  merchants: 'Merchants',
  'user-app': 'User App',
  'rt-app': 'Rt App',
  nitro: 'Nitro',
  'consumer-cms': 'Consumer Cms',
  aliados: 'Aliados',
  'portal-partners': 'Portal Partners',
  brands: 'Brands',
  'mi-tienda': 'Mi Tienda',
  nexus: 'Nexus',
  'marketing-suite': 'Marketing Suite',
  cargo: 'Cargo',
}

interface ThemeContextValue {
  theme: PortalThemeName
  setTheme: (theme: PortalThemeName) => void
  themes: readonly PortalThemeName[]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const STORAGE_KEY = 'rds-portal-theme-v2'
const DEFAULT_THEME: PortalThemeName = 'merchants'

function isPortalTheme(value: string | null): value is PortalThemeName {
  return PORTAL_THEMES.some((theme) => theme === value)
}

/**
 * Wraps the app in the design-system ThemeProvider and exposes the active theme
 * + a setter to the portal chrome (so the theme switcher can change it live).
 * The choice is persisted to localStorage.
 */
export function PortalThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<PortalThemeName>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return isPortalTheme(saved) ? saved : DEFAULT_THEME
    } catch {
      return DEFAULT_THEME
    }
  })

  const setTheme = useCallback((next: PortalThemeName) => {
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, [])

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document.body.dataset.theme = theme
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: PORTAL_THEMES }}>
      <ThemeProvider theme={theme as ThemeName}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export function usePortalTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) {
    throw new Error('usePortalTheme must be used within <PortalThemeProvider>')
  }
  return value
}
