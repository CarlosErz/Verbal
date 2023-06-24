import PropTypes from 'prop-types';
import '../css/components.css'
import { Link } from 'react-router-dom';
export function ModalError({ Title, TipoError, bt1, bt2, link1, link2, }) {
  return (
    <>
      <div className="modal">
        <div className="modal-container">
          <h1 className="modal-title">{Title}</h1>
          <p className="modal-text">{TipoError}</p>
          <div className="modalbtn-direccion">
            <button  className="modal-btn"><Link className='Link' to={link1}>
              {bt1}
            </Link></button>
            <button  className="modal-btn"><Link className='Link' to={link2}>
              {bt2}
            </Link></button>
          </div>
        </div>
      </div>
    </>
  )
}
ModalError.propTypes = {
  Title: PropTypes.string.isRequired,
  TipoError: PropTypes.string.isRequired,
  bt1: PropTypes.string.isRequired,
  bt2: PropTypes.string.isRequired,
  link1: PropTypes.string.isRequired,
  link2: PropTypes.string.isRequired,
};