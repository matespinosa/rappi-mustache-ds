import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// 1) Design-system foundations: base tokens (also loads the PP Object Sans font).
import '@rappi-ds/tokens/base.css'
// 2) Product themes supported by this portal.
import '@rappi-ds/tokens/themes/user-app.css'
import '@rappi-ds/tokens/themes/rt-app.css'
import '@rappi-ds/tokens/themes/nitro.css'
import '@rappi-ds/tokens/themes/consumer-cms.css'
import '@rappi-ds/tokens/themes/aliados.css'
import '@rappi-ds/tokens/themes/portal-partners.css'
import '@rappi-ds/tokens/themes/brands.css'
import '@rappi-ds/tokens/themes/mi-tienda.css'
import '@rappi-ds/tokens/themes/nexus.css'
import '@rappi-ds/tokens/themes/marketing-suite.css'
import '@rappi-ds/tokens/themes/cargo.css'
// 3) Component styles.
import '@rappi-ds/react/styles.css'
// 4) Portal chrome styles.
import './index.css'

import { App } from './App'
import { PortalThemeProvider } from './theme/ThemeContext'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <PortalThemeProvider>
        <App />
      </PortalThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
