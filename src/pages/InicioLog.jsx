import { Tematicas } from '../components/Tematicas.jsx';
import './inicio.css';
import { dataTemas } from '../data/dataTemas.js';

export function InicioLog() {
  return (
    <>
      {dataTemas.map((tema, index) => (
        <div className="base" key={index}>
          <p className="temas">{tema.tema}</p>
          <div className="container">

          <Tematicas
            imagen1={tema.imagen1}
            alt1={tema.alt1}
            imagen2={tema.imagen2}
            alt2={tema.alt2}
            imagen3={tema.imagen3}
            alt3={tema.alt3}
            imagen4={tema.imagen4}
            alt4={tema.alt4}
          /></div>
        </div>
      ))}
    </>
  );
}
