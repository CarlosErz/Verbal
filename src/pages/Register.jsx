import { Btn } from '../components/Btn';
import { Inputs } from '../components/Inputs';
import { dataInputs } from '../data/dataInputs.js';
import icon from '/src/assets/fb.svg';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '/src//assets/logoContorno.svg'

export function Register() {
  const handleFacebookLogin = () => {
    if (!window.FB) return;

      window.FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          window.FB.api('/me', { fields: 'name, email' }, response => {
            console.log(response);
          });
        } else {
          console.log('No se pudo obtener el email');
          window.FB.login(facebookLoginHandler, { scope: 'public_profile,email' });
        }
      });

  };

  const facebookLoginHandler = (response) => {
    console.log(response);
    if (response.status === 'connected') {
      window.FB.api('/me?fields=id,name,email,picture', userData => {
        console.log(userData);
      });
    } else {
      console.log('No se pudo obtener el email');
    }
  };

  return (
    <div className="Formulario">
      <h1 className="Title">REGISTRATE</h1>
      <img src={logo} alt="Logo verbal+ " className="logo" />
      <form className="Form" action="POST">
        {dataInputs.map((input, index) => (
          <Inputs
            key={index}
            TituloInput={input.TituloInput}
            TipoInput={input.TipoInput}
            NombreInput={input.NombreInput}
            IdInput={input.IdInput}
          />
        ))}
        <Btn
          TypeBtn='submit'
          NameBtn='Registrarse'
        />
      </form>
      <button className="facebook-login-button" onClick={handleFacebookLogin}>
        <img src={icon} alt="" className="icon" />
      </button>
      <p className="Text">¿Ya tienes una cuenta? <Link to="/Login" className="Link">Inicia sesión</Link></p>
    </div>
  );
}