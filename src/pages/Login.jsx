import { Btn } from '../components/Btn';
import { useState, useEffect } from 'react';
import { Inputs } from '../components/Inputs';
import { Link } from 'react-router-dom';
import { datainiciar } from '../data/datainiciar.js';
import icon from '/src/assets/fb.svg';
import logo from '/src/assets/logo.svg';

import { handleFacebookLogin } from '../utils/auth';

export function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
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
       
        <Btn TypeBtn="submit" NameBtn="Iniciar sesión" /> <div className="btnfb">
          {!loggedIn && (
            <button className="facebook-login-button" onClick={handleFacebookLogin}>
              <img src={icon} alt="" className="icon" />
            </button>
          )}
        </div>
      </form>
      <p className="Text">
        ¿No tienes una cuenta? <Link to="/Register" className="Link">Regístrate</Link>
      </p>
      
    </div>
  );
}
