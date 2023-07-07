import '../src/css/app.css'
import { Register } from './pages/Register'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import {Login} from './pages/Login'
import '../src/css/components.css'
import {InicioLog} from './pages/InicioLog'
import 'normalize.css';
import {Salas} from './pages/Salas'
import { Privacy } from './components/Privacy.jsx'
import {User} from './pages/User'

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<InicioLog />} />
        <Route path="/Inicio" element={<InicioLog />} />
        <Route path="/Salas" element={<Salas/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Privacy" element={< Privacy/>} />
        <Route path="/User" element={<User/>} />
        
      </Routes>
    </BrowserRouter>
  )
}

