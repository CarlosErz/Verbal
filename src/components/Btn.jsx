import PropTypes from 'prop-types';
import '../css/components.css';

export function Btn({ TypeBtn, NameBtn }) {
  return (
    <>
      <button  className="btn" type={TypeBtn}>{NameBtn}
      </button>
    </>
  );
}

Btn.propTypes = {
  TypeBtn: PropTypes.string.isRequired,
  NameBtn: PropTypes.string.isRequired,
};
