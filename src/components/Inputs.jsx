import { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/components.css';
import eyeIcon from '../assets/eye.svg';
import eyeSlashIcon from '../assets/eyeclost.svg';

export function Inputs({ TituloInput, TipoInput, NombreInput, IdInput }) {
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const handleChangeMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const renderIcono = () => {
    if (TipoInput === 'password') {
      return (
        <span className="icono" onClick={handleChangeMostrarContraseña}>
         <img className='icono' src={mostrarContraseña ? eyeSlashIcon : eyeIcon} alt="Mostrar contraseña" />
        </span>
      );
    }
    return null;
  };

  return (
    <>
      <div className="inputContainer">
        <label className="label" htmlFor={IdInput}>
          {TituloInput}
        </label>
        <div className="inputWrapper">
          <input required className="input" type={mostrarContraseña ? 'text' : TipoInput} name={NombreInput} id={IdInput} />
          {renderIcono()}
        </div>
      </div>
    </>
  );
}

Inputs.propTypes = {
  TituloInput: PropTypes.string.isRequired,
  TipoInput: PropTypes.string.isRequired,
  NombreInput: PropTypes.string.isRequired,
  IdInput: PropTypes.string.isRequired,
};
