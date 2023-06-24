import React, { useState, useEffect } from 'react';
import { Btn } from '../components/Btn';
import { Inputs } from '../components/Inputs';
import { dataInputs } from '../data/dataInputs.js';
import icon from '/src/assets/fb.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import logo from '/src/assets/logoContorno.svg';

export function Register() {
  const [inputValues, setInputValues] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const handleInputChange = (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleinfo = (event) => {
    event.preventDefault();
    console.log(inputValues);

    axios.post('http://localhost:3000/api/users', {
      nombre: 'John Doe',
      contrasena: 'secreto123'
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const initFacebookSDK = () => {
    // Carga el SDK de Facebook de forma asíncrona
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '3582555598695211',
        cookie: true,
        xfbml: true,
        version: 'v11.0'
      });

      window.FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          setLoggedIn(true);
          getUserData();
        }
      });
    };

    // Carga el SDK de Facebook
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/es_LA/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  };

  const getUserData = () => {
    window.FB.api('/me?fields=name,picture', userData => {
      setUserData(userData);
    });
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  const handleFacebookLogin = () => {
    if (!window.FB) return;

    window.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        setLoggedIn(true);
        getUserData();
      } else {
        console.log('No se pudo obtener el email');
        window.FB.login(facebookLoginHandler, { scope: 'public_profile' });
      }
    });
  };

  const facebookLoginHandler = (response) => {
    console.log(response);
    if (response.status === 'connected') {
      setLoggedIn(true);
      getUserData();
    } else {
      console.log('No se pudo obtener el email');
    }
  };

  return (
    <div className="Formulario">
      <h1 className="Title">REGISTRATE</h1>
      <img src={logo} alt="Logo verbal+ " className="logo" />
      {loggedIn && (
        <>
          <p>Bienvenido, {userData.name}</p>
          <img src={userData.picture.data.url} alt="Foto de perfil" />
        </>
      )}
      <form className="Form" onSubmit={handleinfo}>
        {dataInputs.map((input, index) => (
          <Inputs
            key={index}
            TituloInput={input.TituloInput}
            TipoInput={input.TipoInput}
            NombreInput={input.NombreInput}
            IdInput={input.IdInput}
            onInputChange={handleInputChange}
          />
        ))}
        <Btn onClick={handleinfo} TypeBtn='submit' NameBtn='Registrarse' />
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
