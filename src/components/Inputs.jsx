import PropTypes from 'prop-types';
import '../css/components.css';

export function Inputs({ TituloInput, TipoInput, NombreInput, IdInput }) {
  return (
    <>
      <div className="inputContainer">
        <label className="label"  htmlFor={TipoInput}>{TituloInput}</label>
        <input className="input" type={TipoInput} name={NombreInput} id={IdInput} />
      </div>
    </>
  )
}

Inputs.propTypes = {
  TituloInput: PropTypes.string.isRequired,
  TipoInput: PropTypes.string.isRequired,
  NombreInput: PropTypes.string.isRequired,
  IdInput: PropTypes.string.isRequired,
};
