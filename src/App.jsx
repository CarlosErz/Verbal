import '../src/css/app.css'
import { Register } from './pages/Register'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import {Login} from './pages/Login'
export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

