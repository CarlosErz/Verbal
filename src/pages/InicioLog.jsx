import { Tematicas } from '../components/Tematicas.jsx';
import './inicio.css';
import compartir from '../assets/icon-compartir.svg';
import { ModalError } from '../components/ModalError.jsx';
import { dataModalLog } from '../data/dataModalLog.js';

export function InicioLog() {
  return (
    <>
      <ModalError
        Title={dataModalLog[0].Title}
        TipoError={dataModalLog[0].TipoError}
        bt1={dataModalLog[0].bt1}
        bt2={dataModalLog[0].bt2}
        link1={dataModalLog[0].link1}
        link2={dataModalLog[0].link2}
      />
      <div className='btn_compartir'>
        <img className='compartir' src={compartir} alt="Compartir" border="0" />
        <a href="#" className='linkto'>
          Con amigos es mas divertido!!
        </a>
      </div>

      <h1 className='title'>ELIGE TU TEMA</h1>
      <Tematicas></Tematicas>
    </>
  );
}
