import PropTypes from 'prop-types';
export function Modal({ Title, onclick }) {
  return (
    <>
      <div className="modal">
        <div className="modal-container">
          <h1 className="modal-title">{Title}</h1>
          <button className="modal-btn" onClick={onclick}>Aceptar</button>
        </div>
      </div>
    </>
  )
}


Modal.propTypes = {
  Title: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired,
};