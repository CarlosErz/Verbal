import { useState } from 'react';
import { Btn } from '../components/Btn.jsx';
import { Inputs } from '../components/Inputs';
import { dataInputs } from '../data/dataInputs.js';
import { Link } from 'react-router-dom';
import './Register.css';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import icon from '/src/assets/fb.svg';
import logo from '/src/assets/logo.svg';
import { getDatabase, ref, set } from 'firebase/database';
import google from '/src/assets/google.svg';
import { Modal } from '../components/Modal.jsx';



export function Register() {

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
  const auth = getAuth(app)

  const [showModal, setShowModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [ContrDif, setContrDif] = useState(false);
  const [Yaregistrado, setYaregistrado] = useState(false);

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowTermsModal(false);
  };
  const FaceboockLogin = () => {
    if (acceptedTerms) {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
        .then(() => {
          setShowModal(true);

          const loginData = {
            provider: 'facebook',
            // accessToken: credential.accessToken,
            // Include other relevant login data

          };
          localStorage.setItem('loggedInUser', JSON.stringify(loginData));


        }
        ).catch((error) => {
          console.log(error);
          setShowModal(false);
        }
        );
    }
    else {
      setShowTermsModal(true);
    }
  }


  const GoogleLogin = () => {
    if (acceptedTerms) {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(() => {
          setShowModal(true);


        }).catch((error) => {
          console.log(error);
          setShowModal(false);
        });
    }
    else {
      setShowTermsModal(true);
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const correoInput = document.querySelector('#CorreoElectronico');
    const contraseñaInput = document.querySelector('#Contrasena');
    const confirmar = document.querySelector('#ConfirmarContra');
    const correoValue = correoInput.value;
    const contraseñaValue = contraseñaInput.value;
    const confirmarcontra = confirmar.value;
    if (acceptedTerms) {
      setShowModal(false);
      if (contraseñaValue !== confirmarcontra) {
        setContrDif(true);
      }
      else {
        setContrDif(false);
        createUserWithEmailAndPassword(auth, correoValue, contraseñaValue)
          .then((userCredential) => {
            const user = userCredential.user;
            setShowModal(true);
            const userData = {
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
            };
            const db = getDatabase();
            set(ref(db, 'users/' + user.uid), userData)
              .then(() => {

              })


            console.log(user);

          })
          .catch(() => {
            setYaregistrado(true);

          });
      }



    }
    else {
      setShowTermsModal(true);
    }

  };


  return (
    <div className="Formulario">
      <h1 className="title">REGISTRATE</h1>
      <Link to="/">
        <img src={logo} alt="Logo verbal+ " className="logo" />
      </Link>
      <form className="Form" onSubmit={handleRegisterSubmit}>
        {dataInputs.map((input, caja) => (
          <Inputs
            key={caja}
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
          <button className="red-login-button" onClick={FaceboockLogin}>
            <img src={icon} alt="" className="icon" />
          </button>

          <button className="red-login-button" onClick={GoogleLogin}>
            <img src={google} alt="" className="icon" />
          </button>

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
      {ContrDif && (
        <Modal
          Title="Las contraseñas no coinciden"
          onclick={() => setContrDif(false)}
        />
      )}
      {Yaregistrado && (
        <Modal
          Title="Usuario ya registrado intente con otro correo"

          onclick={() => setYaregistrado(false)}
        />
      )}

    </div>
  );
}
