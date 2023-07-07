import PropTypes from 'prop-types';
import '../css/components.css';
import { Link } from 'react-router-dom';

export function Btn({ TypeBtn, NameBtn ,link }) {
  return (
    <>
    <Link className="btn" to={link} type={TypeBtn}>{NameBtn}
      </Link>
    </>
  );
}

Btn.propTypes = {
  TypeBtn: PropTypes.string.isRequired,
  NameBtn: PropTypes.string.isRequired,
  link: PropTypes.string
};
