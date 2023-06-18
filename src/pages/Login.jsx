
import { Inputs } from '../components/Inputs';
import { dataInputs } from '../data/dataInputs.js';
import { Btn } from '../components/Btn';
import { LoginSocialFacebook } from 'reactjs-social-login';
import MyFacebookLoginButton from '../components/MyFacebookLoginButton';

import './Login.css';

export function Login() {
  return (
    <div className='Formulario'>
      <h1 className="Title">
        REGISTRATE
      </h1>

      <form className='Form' action="POST">
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

      <LoginSocialFacebook
        appId='3582555598695211'
        onReject={(response) => {
          console.log(response);
        }}
        onResolve={(error) => {
          console.log(error);
        }}
      >
        <MyFacebookLoginButton />
      </LoginSocialFacebook>
    </div>
  );
}
