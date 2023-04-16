import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider} from 'styled-components'
import GlobalStyles from './styles/global'
import theme from './styles/theme'

import { Routes } from './routes' //Como não tem import default no Details.jsx, é necessário colocar em chaves e o nome deve ser igual

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
)
