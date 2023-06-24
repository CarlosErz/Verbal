import  { useState, useEffect } from 'react';
import { Btn } from '../components/Btn';
import { Inputs } from '../components/Inputs';
import { dataInputs } from '../data/dataInputs.js';
import icon from '/src/assets/fb.svg';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '/src/assets/logoContorno.svg';

export function Register() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '3582555598695211',
        cookie: true,
        xfbml: true,
        version: 'v17.0'
      });

      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleRegister = () => {
    // Lógica para el registro
  };

  const handleFacebookLogin = () => {
    window.FB.login(function(response) {
      if (response.status === 'connected') {
        // El usuario ha iniciado sesión y ha autorizado la aplicación
        window.FB.api('/me', { fields: 'name, picture' }, function(userData) {
          const { name, picture } = userData;
          console.log(name, picture.data.url);
          setLoggedIn(true);
          history.push('/Log');
        });
      } else {
        // El usuario no ha iniciado sesión o no ha autorizado la aplicación
        console.log('Error de inicio de sesión');
      }
    }, { scope: 'public_profile,name' });
  };

  return (
    <div className="Formulario">
      <h1 className="Title">REGISTRATE</h1>
      <img src={logo} alt="Logo verbal+ " className="logo" />
      <form className="Form">
        {dataInputs.map((input, index) => (
          <Inputs
            key={index}
            TituloInput={input.TituloInput}
            TipoInput={input.TipoInput}
            NombreInput={input.NombreInput}
            IdInput={input.IdInput}
          />
        ))}
        <Btn onClick={handleRegister} TypeBtn='submit' NameBtn='Registrarse' />
      </form>
      {!loggedIn && (
        <button className="facebook-login-button" onClick={handleFacebookLogin}>
          <img src={icon} alt="" className="icon" />
        </button>
      )}
      <p className="Text">¿Ya tienes una cuenta? <Link to="/Login" className="Link">Inicia sesión</Link></p>
    </div>
  );
}
