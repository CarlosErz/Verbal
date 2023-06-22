import { Btn } from '../components/Btn';
import { Inputs } from '../components/Inputs';
import { dataInputs } from '../data/dataInputs.js';
import icon from '/src/assets/fb.svg';
import './Login.css';
/* global FB */
export function Login() {
  const handleFacebookLogin = () => {
    FB.login(function (response) {
      if (response.authResponse) {
        // El usuario ha iniciado sesión correctamente
        console.log('Inicio de sesión exitoso:', response);
      } else {
        // El usuario ha cancelado el inicio de sesión o ha ocurrido un error
        console.log('Inicio de sesión cancelado o error:', response);
      }
    }, { scope: 'email' }); // Solicitar el permiso de correo electrónico ('email')
  };

  return (
    <div className="Formulario">
      <h1 className="Title">REGISTRATE</h1>
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
    </div>
  );
}
