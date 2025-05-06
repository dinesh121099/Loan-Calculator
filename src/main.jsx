import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './router';
import ThemeProvider from './context/ThemeContext';
import { AppProvider } from './context/AppContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppProvider>
        <RouterProvider router={router}/>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>
)


