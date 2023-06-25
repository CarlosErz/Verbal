import { Btn } from '../components/Btn';
import { Inputs } from '../components/Inputs';
import { Link } from 'react-router-dom';
import { datainiciar } from '../data/datainiciar.js';
import icon from '/src/assets/fb.svg';
import logo from '/src/assets/logoContorno.svg';
import { handleFacebookLogin } from '../utils/auth';

export function Login() {
  return (
    <div className="Formulario">
      <h1 className="Title">INICIA SESIÓN</h1>
      <img src={logo} alt="Logo verbal+ " className="logo" />
      <form className="Form" action="POST">
        {datainiciar.map((input, index) => (
          <Inputs
            key={index}
            TituloInput={input.TituloInput}
            TipoInput={input.TipoInput}
            NombreInput={input.NombreInput}
            IdInput={input.IdInput}
          />
        ))}
        <Btn TypeBtn="submit" NameBtn="Iniciar sesión" />
      </form>
      <button className="facebook-login-button" onClick={handleFacebookLogin}>
        <img src={icon} alt="" className="icon" />
      </button>
      <p className="Text">
        ¿No tienes una cuenta? <Link to="/Register" className="Link">Regístrate</Link>
      </p>
      
    </div>
  );
}
