import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
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
