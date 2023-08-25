import { Tematicas } from '../components/Tematicas.jsx';
import './inicio.css';
import compartir from '../assets/icon-compartir.svg';
import { Juegos } from '../components/Juegos.jsx';
import { Navbar } from '../components/Navbar.jsx';
import 'normalize.css';
import PropTypes from 'prop-types';


export function Type({ loggedInUser}) {




  return (
    <>
      <Navbar

        Nombre={loggedInUser && loggedInUser.displayName}
        avatar={loggedInUser && loggedInUser.photoURL}
        onError={'https://i.postimg.cc/TPP2gvgV/notFoto.png'}

      />
      <div className="contenido">
        <div className='btn_compartir'>
          <div className="bg_compartir">
            <img className='compartir' src={compartir} alt="Compartir" />
          </div>
          <a href="#" className='linkto'>
            Con amigos es más divertido!!
          </a>
        </div>
        <Juegos alt1='juegos'

        
        />
      </div>
      <p className='title'>ELIGE TU TEMA</p>



      <Tematicas alt1='Imagen de Tematica' loggedIn={loggedInUser} 
      />

   
    </>
  );
}
Type.propTypes = {
  loggedInUser: PropTypes.object,
  setLoggedInUser: PropTypes.func,
}