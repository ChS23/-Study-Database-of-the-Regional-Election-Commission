import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes  } from "react-router-dom"
import Elections from './components/screens/Elections'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Elections />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
