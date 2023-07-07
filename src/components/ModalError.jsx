import  { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/components.css';
import { Link } from 'react-router-dom';
import tachaIcon from '../assets/tacha.svg';

export function ModalError({ Title, TipoError, bt1, bt2, link1, link2 }) {
  const [modalVisible, setModalVisible] = useState(true);

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {modalVisible && (
          <div className={`modal ${modalVisible ? '' : 'modal-exit'}`}>
          <div className="modal-container">
            <button className="close-button" onClick={hideModal}>
              <img src={tachaIcon} alt="Cerrar" />
            </button>
            <h1 className="modal-title">{Title}</h1>
            <p className="modal-text">{TipoError}</p>
            <div className="modalbtn-direccion">
              <button className="modal-btn">
                <Link className="Link" to={link1}>
                  {bt1}
                </Link>
              </button>
              <button className="modal-btn">
                <Link className="Link" to={link2}>
                  {bt2}
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ModalError.propTypes = {
  Title: PropTypes.string.isRequired,
  TipoError: PropTypes.string.isRequired,
  bt1: PropTypes.string,
  bt2: PropTypes.string,
  link1: PropTypes.string ,
  link2: PropTypes.string
};
