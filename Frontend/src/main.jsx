
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'

const queryclient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryclient}>
    <App />
    </QueryClientProvider >
  </BrowserRouter>,
  
)
