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
          <ComBtn className='Iniciar' NameBtn='INICIAR SESIÓN' link='/login' />

          <ComBtn className='registrarte' NameBtn='REGISTRATE' link='/register' />

          <ComBtn className='JuegoRapido' NameBtn='JUEGO RAPIDO' link='/QuickGame' />

        </div>
      </div>

    <FontColor/>
    </>
  );
}
