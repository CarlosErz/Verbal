import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.jsx'
import 'normalize.css';
import '../src/css/app.css'
import '../src/css/components.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App></App>

  </React.StrictMode>
)
