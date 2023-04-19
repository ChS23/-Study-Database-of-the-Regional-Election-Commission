import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes  } from "react-router-dom"
import Elections from './components/screens/Elections'
import Store from './providers/appProvider'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Store>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Elections />}/>
        </Routes>
      </BrowserRouter>
    </Store>
  </React.StrictMode>,
)
