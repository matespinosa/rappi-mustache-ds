import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { ThemeProvider } from '@rappi-ds/react'
import { themes, type ThemeName } from '@rappi-ds/tokens'

interface ThemeContextValue {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
  themes: ThemeName[]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const STORAGE_KEY = 'rds-portal-theme'
const DEFAULT_THEME: ThemeName = 'food'

/**
 * Wraps the app in the design-system ThemeProvider and exposes the active theme
 * + a setter to the portal chrome (so the theme switcher can change it live).
 * The choice is persisted to localStorage.
 */
export function PortalThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    return saved && themes.includes(saved) ? saved : DEFAULT_THEME
  })

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
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
