import { Tematicas } from '../components/Tematicas.jsx';
import { useEffect, useState } from 'react';
import './inicio.css';
import compartir from '../assets/icon-compartir.svg';
import { Juegos } from '../components/Juegos.jsx';
import { Navbar } from '../components/Navbar.jsx';
//import Juego1 from '../assets/juego1.png';
import { ModalError } from '../components/ModalError.jsx';
import { dataModalLog } from '../data/dataModalLog.js';
import 'normalize.css';

export function InicioLog() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      {!loggedIn && (
        <ModalError
          Title={dataModalLog[0].Title}
          TipoError={dataModalLog[0].TipoError}
          bt1={dataModalLog[0].bt1}
          bt2={dataModalLog[0].bt2}
          link1={dataModalLog[0].link1}
          link2={dataModalLog[0].link2}
        />
      )}
      <div className="contenido">
        <div className='btn_compartir'>
          <div className="bg_compartir">
            <img className='compartir' src={compartir} alt="Compartir" />
          </div>
          <a href="#" className='linkto'>
            Con amigos es más divertido!!
          </a>
        </div>
        <Juegos alt1='juegos'/>
      </div>
      <p className='title'>ELIGE TU TEMA</p>
      <Tematicas alt1='Imagen de Tematica' />
    </>
  );
}
