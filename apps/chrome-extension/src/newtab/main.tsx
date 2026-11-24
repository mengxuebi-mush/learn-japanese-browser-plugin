import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NewTabApp } from './NewTabApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewTabApp />
  </StrictMode>,
)
