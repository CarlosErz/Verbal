import '../src/css/app.css'
import { Register } from './pages/Register'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import {Login} from './pages/Login'
import '../src/css/components.css'
import {InicioLog} from './pages/InicioLog'
export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<InicioLog />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

