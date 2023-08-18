import '../src/css/app.css'
import { Register } from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import '../src/css/components.css'
import { InicioLog } from './pages/InicioLog'
import 'normalize.css';
import { Type } from './pages/Type'
import { Privacy } from './components/Privacy.jsx'
import { User } from './pages/User'
import { Azar } from './pages/Azar.jsx'
import { useState } from 'react'
import { RuleLetras } from './components/RuleLetras'

export function App() {
  const [selectedLetter, setSelectedLetter] = useState('');


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<InicioLog />} />
        <Route path="/Inicio" element={<InicioLog />} />
        <Route path="/Type" element={<Type />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Privacy" element={< Privacy />} />
        <Route path="/User" element={<User />} />
        <Route path="/ruleta" element={<Azar 
         selectedLetter={selectedLetter}
         setSelectedLetter={setSelectedLetter}
        
        />} />
        <Route path="/componenrulet" element={
          <RuleLetras
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
          />

        } />

      </Routes>
    </BrowserRouter>
  )
}

