import { Tematicas } from '../components/Tematicas.jsx';
import './inicio.css';
import compartir from '../assets/icon-compartir.svg';
import { Juegos } from '../components/Juegos.jsx';
import { Navbar } from '../components/Navbar.jsx';
//import Juego1 from '../assets/juego1.png';
//import { ModalError } from '../components/ModalError.jsx';
//import { dataModalLog } from '../data/dataModalLog.js';



import 'normalize.css';


export function InicioLog() {
  return (
    <>
      <Navbar></Navbar>
      <div className="contenido">
        <div className='btn_compartir'>
          <div className="bg_compartir">
            <img className='compartir' src={compartir} alt="Compartir" /></div> <a href="#" className='linkto'>
            Con amigos es mas divertido!!
          </a>
        </div>
        <Juegos></Juegos>
      </div>
      <p className='title'>ELIGE TU TEMA</p>
      <Tematicas
        alt1='Imagen de Tematica'
      ></Tematicas>


    </>
  );
}
