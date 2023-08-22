import PropTypes from 'prop-types';
import tachaIcon from '../assets/tacha.svg';

export function Modal({ Title, onclick ,hideModal}) {
  return (
    <>

      <div className="modal">

        <div className="modal-container">
          <button className="close-button" onClick={hideModal}>
            <img src={tachaIcon} alt="Cerrar" />
          </button>
          <h1 className="modal-title">{Title}</h1>
          <button className="modal-btn" onClick={onclick}>Aceptar</button>
        </div>
      </div>
    </>
  )
}


Modal.propTypes = {
  Title: PropTypes.string.isRequired,
  onclick: PropTypes.func,
  hideModal: PropTypes.func.isRequired,
};