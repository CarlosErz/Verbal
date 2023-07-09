import PropTypes from 'prop-types';
import tachaIcon from '../assets/tacha.svg';
import { useState } from 'react';

export function Modal({ Title, onclick }) {
  const [modalVisible, setModalVisible] = useState(true);
  const hideModal = () => {
    setModalVisible(false);
  };
  return (
    <>
    {modalVisible && (
      <div className="modal">

        <div className="modal-container">
          <button className="close-button" onClick={hideModal}>
            <img src={tachaIcon} alt="Cerrar" />
          </button>
          <h1 className="modal-title">{Title}</h1>
          <button className="modal-btn" onClick={onclick}>Aceptar</button>
        </div>
      </div>
    )}
    </>
  )
}


Modal.propTypes = {
  Title: PropTypes.string.isRequired,
  onclick: PropTypes.func
};