import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource/onest/cyrillic-400.css'
import '@fontsource/onest/latin-400.css'
import '@fontsource/onest/cyrillic-500.css'
import '@fontsource/onest/latin-500.css'
import '@fontsource/onest/cyrillic-600.css'
import '@fontsource/onest/latin-600.css'
import '@fontsource/onest/cyrillic-700.css'
import '@fontsource/onest/latin-700.css'
import '@fontsource/geologica/cyrillic-500.css'
import '@fontsource/geologica/latin-500.css'
import '@fontsource/geologica/cyrillic-600.css'
import '@fontsource/geologica/latin-600.css'
import '@fontsource/geologica/cyrillic-700.css'
import '@fontsource/geologica/latin-700.css'
import '@fontsource/ibm-plex-mono/cyrillic-400.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/cyrillic-500.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import './index.css'
import './lib/i18n'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App pathname={window.location.pathname} />
  </StrictMode>
)

if (root.dataset.prerendered === 'true') {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
