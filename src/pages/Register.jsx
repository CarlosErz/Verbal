import { useState, useEffect } from 'react';
import { Btn } from '../components/Btn';
import { Inputs } from '../components/Inputs';
import { dataInputs } from '../data/dataInputs.js';
import { Link } from 'react-router-dom';
import './Register.css';
import icon from '/src/assets/fb.svg';
import logo from '/src/assets/logo.svg';
import { handleRegister, handleFacebookLogin } from '../utils/auth';
import { Modal } from '../components/Modal.jsx';

export function Register() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowTermsModal(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (acceptedTerms) {
      handleRegister();
      setShowModal(true);
    } else {
      setShowTermsModal(true);
    }
  };
  const FaceboockLogin = () => {
    if (acceptedTerms) {
      handleFacebookLogin();
      setShowModal(true);
    }
    else {
      setShowTermsModal(true);
    }
  }

  return (
    <div className="Formulario">
      <h1 className="title">REGISTRATE</h1>
      <Link to="/">
        <img src={logo} alt="Logo verbal+ " className="logo" />
      </Link>
      <form className="Form" onSubmit={handleRegisterSubmit}>
        {dataInputs.map((input, index) => (
          <Inputs
            key={index}
            TituloInput={input.TituloInput}
            TipoInput={input.TipoInput}
            NombreInput={input.NombreInput}
            IdInput={input.IdInput}
          />
        ))}
        <div className="privacy-policy">
          <input
            type="checkbox"
            id="privacy-policy-checkbox"
            checked={acceptedTerms}
            onChange={handleAcceptTerms}
          />
          <label htmlFor="privacy-policy-checkbox">
            Acepto las <Link to="/Privacy">políticas de privacidad</Link>
          </label>
        </div>
        <Btn TypeBtn="submit" NameBtn="Registrarse" />
        <div className="btnfb">
          {!loggedIn && (
            <button className="facebook-login-button" onClick={FaceboockLogin}>
              <img src={icon} alt="" className="icon" />
            </button>
          )}
        </div>

      </form>

      <p className="Text">
        ¿Ya tienes una cuenta? <Link to="/Login" className="Link">Inicia sesión</Link>
      </p>
      {showModal && (
        <Modal Title="Registrado con éxito" onclick={() => setShowModal(false)} />
      )}

      {showTermsModal && (
        <Modal
          Title="Debes aceptar los términos y condiciones"
          onclick={() => setShowTermsModal(false)}
        />
      )}
    </div>
  );
}
