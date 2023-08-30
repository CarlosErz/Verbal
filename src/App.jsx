import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

import '../src/css/app.css';
import '../src/css/components.css';
import 'normalize.css';

import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { InicioLog } from './pages/InicioLog';
import { Type } from './pages/Type';
import { Privacy } from './components/Privacy.jsx';
import { User } from './pages/User';
import { Azar } from './pages/Azar.jsx';
import { QuickGame } from './pages/QuickGame.jsx';
import { GameDisney } from './pages/GameDisney';
import {ChooseGame} from './pages/ChooseGame.jsx';

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
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const storedUserData = localStorage.getItem('loggedInUser');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setLoggedInUser(userData);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedInUser(user);
        } else {
          setLoggedInUser(null);
        }
      });

      return () => unsubscribe();
    }
  }, [auth]);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedInUser ? <Type
          loggedInUser={loggedInUser}

        /> : <InicioLog />} />
        <Route path="/Type" element={loggedInUser ? <Type
          loggedInUser={loggedInUser}

        /> : <InicioLog />} />
        <Route path="/Inicio" element={<InicioLog />} />
        <Route path="/Register" element={<Register
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}
        />} />
        <Route path="/Login" element={<Login
          setLoggedInUser={setLoggedInUser}
          loggedInUser={loggedInUser}
        />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/User" element={<User
          loggedInUser={loggedInUser}
        />} />
        <Route path="/ruleta" element={<Azar selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />} />
        <Route path='/QuickGame' element={<QuickGame selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />} />
        <Route path='/QuickDisney' element={<GameDisney />} />
        <Route path='ChooseGame' element={<ChooseGame></ChooseGame>}/>
      </Routes>


    </BrowserRouter>
  )
}

export default App;