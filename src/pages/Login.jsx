import { Btn } from '../components/Btn';
import { useState, useEffect } from 'react';
import { Inputs } from '../components/Inputs';
import { Link } from 'react-router-dom';
import { datainiciar } from '../data/datainiciar.js';
import icon from '/src/assets/fb.svg';
import google from '/src/assets/google.svg';
import logo from '/src/assets/logo.svg';
import { initializeApp } from "firebase/app";
import { Modal } from '../components/Modal';
import '../css/components.css'
import './Register.css'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export function Login({ setLoggedInUser, loggedInUser }) {
  const navigate = useNavigate();

  const firebaseConfig = {
    apiKey: "AIzaSyBRsPogiEuE0BPQ_G0ppustO9XKnisbXm4",
    authDomain: "verbal-89593.firebaseapp.com",
    projectId: "verbal-89593",
    storageBucket: "verbal-89593.appspot.com",
    messagingSenderId: "1002243186731",
    appId: "1:1002243186731:web:0ce4b0c53670ca22408a6e",
    measurementId: "G-N228VQJ8ZB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [showModal, setShowModal] = useState(false);
  const [Nosepudo, setNosepudo] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario ha iniciado sesión
        setLoggedInUser(user);
      } else {
        // El usuario no ha iniciado sesión
        setLoggedInUser(null);
      }
    });

    // Eliminar el observador de cambios al desmontar el componente
    return () => unsubscribe();
  }, [auth, setLoggedInUser]);

  const GoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setShowModal(true);
        const user = result.user;
        setLoggedInUser(user);
        navigate('/Type');

        // Guardar datos específicos para inicio de sesión con Google
        const googleLoginData = {
          provider: 'google',
          displayName: user.displayName,
          photoURL: user.photoURL,
          // Agrega otros datos que quieras almacenar
        };
        localStorage.setItem('loggedInUser', JSON.stringify(googleLoginData));
      })
      .catch((error) => {
        console.log(error);
        setShowModal(false);
      });
  }

  const FaceboockLogin = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setShowModal(true);
        setLoggedInUser(user);
      })
      .catch((error) => {
        console.log(error);
        setShowModal(false);
      });
  }

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.CorreoElectronico.value;
    const password = event.target.Contrasena.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Inicio de sesión exitoso
        const user = userCredential.user;
        setShowModal(true);
        setLoggedInUser(user);
        const loginData = {
          provider: 'email',
          name: user.displayName,
          photoURL: user.photoURL,
        };
        localStorage.setItem('loggedInUser', JSON.stringify(loginData));
      })
      .catch((error) => {
        // Inicio de sesión fallido
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setShowModal(false);
        setNosepudo(true);
      });
  }


  return (
    <div className="Formulario">
      <h1 className="title">INICIA SESIÓN</h1>
      <Link to='/'>
        <img src={logo} alt="Logo verbal+ " className="logo" />
      </Link>

      <form className="Form" onSubmit={handleLogin} >
        {datainiciar.map((input, index) => (
          <Inputs
            key={index}
            TituloInput={input.TituloInput}
            TipoInput={input.TipoInput}
            NombreInput={input.NombreInput}
            IdInput={input.IdInput}
          />
        ))}

        <Btn TypeBtn="submit" NameBtn="Iniciar sesion" /> <div className="btnfb">
          <div className="btnfb">
            <button className="red-login-button" onClick={FaceboockLogin}>
              <img src={icon} alt="" className="icon" />
            </button>

            <button className="red-login-button" onClick={GoogleLogin}>
              <img src={google} alt="" className="icon" />
            </button>

          </div>
        </div>
        <p className="Text">
          ¿No tienes una cuenta? <Link to="/Register" className="Link">Regístrate</Link>
        </p>
      </form>

      {showModal && (
        <Modal Title="Inicio de sesion con exito" onclick={() => setShowModal(false)} />
      )}
      {Nosepudo && (
        <Modal Title="Error a el inciar sesion" onclick={() => setNosepudo(false)}
        />
      )}
      {loggedInUser && (
        <p className='estate'>Usuario actualmente iniciado sesión como:

          <span className='user'>
            {loggedInUser.email}
          </span>
        </p>
      )}


    </div>
  );
}
Login.propTypes = {
  setLoggedInUser: PropTypes.func,
  loggedInUser: PropTypes.object,
}

