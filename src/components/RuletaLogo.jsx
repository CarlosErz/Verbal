import rueda from '../assets/RULETA.svg'
import tacha from '../assets/ICONLOGO.svg'
import '../css/components.css';

export function Ruleta() {
  return (
    <>
      <div className="ruletaContainer">
        <div className="ruletaWrapper">
          <img className='ruleta' src={rueda} alt="ruleta" />
          <img className='tacha' src={tacha} alt="tacha" />
        </div>
      </div>
    </>
  );
}