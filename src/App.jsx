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
import { useState , useEffect} from 'react'
import {SalaSolo} from './pages/SalaSolo'

import { RuleLetras } from './components/RuleLetras'
import {onAuthStateChanged,getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBRsPogiEuE0BPQ_G0ppustO9XKnisbXm4",
  authDomain: "verbal-89593.firebaseapp.com",
  projectId: "verbal-89593",
  storageBucket: "verbal-89593.appspot.com",
  messagingSenderId: "1002243186731",
  appId: "1:1002243186731:web:0ce4b0c53670ca22408a6e",
  measurementId: "G-N228VQJ8ZB"
};

export function App() {
  const [selectedLetter, setSelectedLetter] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  console.log(loggedInUser);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario ha iniciado sesión
        setLoggedInUser(user);
      } else {
        // El usuario no ha iniciado sesión
        setLoggedInUser(null);
      }
    });

    // Eliminar el observador de cambios al desmontar el componente
    return () => unsubscribe();
  }, [auth, setLoggedInUser]);
  return (
    <BrowserRouter>
      <Routes>
        {loggedInUser ? ( // Si el usuario ha iniciado sesión, renderiza la ruta "Type"
          <Route path="/" element={<Type 
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />} />
        ) : ( // Si el usuario no ha iniciado sesión, renderiza la ruta "InicioLog"
          <Route path="/" element={<InicioLog />} />
        )}
        <Route path="/Type" element={<Type 
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />} />
        <Route path="/Inicio" element={<InicioLog />} />
        <Route path="/Register" element={<Register 
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />} />
        <Route path="/Login" element={<Login 
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />} />
        <Route path="/Privacy" element={< Privacy />} />
        <Route path="/User" element={<User 
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />} />
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
       <Route path='/SalaSolo' element={<SalaSolo
       selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
       />
      
      }>
        
       </Route>
      </Routes>
    </BrowserRouter>
  )
}