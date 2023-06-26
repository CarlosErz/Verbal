import  { useState } from 'react';
import { Link } from 'react-router-dom';

export function Privacy() {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
  };

  return (
    <>
      <div className="Contenedor_PrivacyPolicy">
        <h1>Política de Privacidad</h1>

        <h2>Información recopilada</h2>
        <p>Al utilizar nuestro sitio web, podemos recopilar la siguiente información personal:</p>
        <ul>
          <li>Nombre de usuario</li>
          <li>Foto de perfil</li>
          <li>Identificador único</li>
        </ul>
        <h2>Uso de la información</h2>
        <p>La información recopilada se utilizará únicamente con los siguientes propósitos:</p>
        <ul>
          <li>Personalizar la experiencia del usuario en nuestro sitio web.</li>
          <li>Permitir el acceso a determinadas funciones o áreas del sitio.</li>
          <li>Enviar notificaciones relacionadas con el uso del sitio.</li>
          <li>Mejorar nuestros productos y servicios.</li>
        </ul>

        {accepted && (
          <>
            <h2>Protección de la información</h2>
            <p>
              Nos comprometemos a proteger la información personal de nuestros usuarios y a tomar todas las medidas
              razonables para garantizar su seguridad. No compartiremos, venderemos ni divulgaremos su información
              personal a terceros, excepto cuando sea necesario para cumplir con la ley o para proteger nuestros
              derechos legales.
            </p>
            <h2>Cambios en la política de privacidad</h2>
            <p>
              Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio
              será publicado en esta página y entrará en vigencia de inmediato. Le recomendamos que revise
              periódicamente esta política para mantenerse informado sobre cómo protegemos su información personal.
            </p>
            <h2>Contacto</h2>
            <p>
              Si tiene alguna pregunta o inquietud sobre nuestra política de privacidad, no dude en ponerse en contacto
              con nosotros a través de.
            </p>

            <Link className="btn-continue" to="/Register">
              Continuar
            </Link>
          </>
        )}

        {!accepted && (
          <Link onClick={handleAccept} className="btn-accept">
            Continuar
          </Link>
        )}
      </div>
    </>
  );
}
