import { useState, useEffect } from 'react';
import { Btn } from '../components/Btn';
import { Inputs } from '../components/Inputs';
import { dataInputs } from '../data/dataInputs.js';
import { Link } from 'react-router-dom';
import './Register.css';
import icon from '/src/assets/fb.svg';
import logo from '/src/assets/logoContorno.svg';
import { handleRegister, handleFacebookLogin } from '../utils/auth';
import { Modal } from '../components/Modal.jsx';

export function Register() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="Formulario">
      <h1 className="Title">REGISTRATE</h1>
      <Link to='/'>
        <img src={logo} alt="Logo verbal+ " className="logo" />
      </Link>
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
      <p className="Text">
        ¿Ya tienes una cuenta? <Link to="/Login" className="Link">Inicia sesión</Link>
      </p>
      {showModal && (
        <Modal
          Title="Registrado con éxito"
          onclick='/InicioLog'
        />
      )}
    </div>
  );
}
