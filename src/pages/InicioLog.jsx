import { Tematicas } from '../components/Tematicas.jsx';
import './inicio.css';
//import compartir from '../assets/icon-compartir.svg';
//import { ModalError } from '../components/ModalError.jsx';
//import { dataModalLog } from '../data/dataModalLog.js';

/* <div className='btn_compartir'>
        <img className='compartir' src={compartir} alt="Compartir" />
        <a href="#" className='linkto'>
          Con amigos es mas divertido!!
        </a>
      </div> */
      
import 'normalize.css';


export function InicioLog() {
  return (
    <>
      <h1 className='title'>ELIGE TU TEMA</h1>
      <Tematicas></Tematicas>
    </>
  );
}
