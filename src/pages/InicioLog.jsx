import './inicio.css';
import 'normalize.css';
import { ComBtn } from '../components/ComBtn';
import { Ruleta } from '../components/RuletaLogo';
import { FontColor } from '../components/FontColor';

export function InicioLog() {

  return (
    <>
      <div className="contendis">
        <div className="contenthome">
          <Ruleta />
          <ComBtn NameBtn='INICIAR SESIÓN' link='/login' />

          <ComBtn NameBtn='REGISTRATE' link='/register' />

          <ComBtn NameBtn='JUEGO RAPIDO' link='/ruleta' />

        </div>
      </div>

    <FontColor/>
    </>
  );
}
