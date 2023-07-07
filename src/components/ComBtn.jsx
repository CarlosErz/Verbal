import PropTypes from 'prop-types';
import '../css/components.css';
import { Link } from 'react-router-dom';

export function ComBtn({  NameBtn ,link }) {
  return (
    <>
    <Link className="btn" to={link} >{NameBtn}
      </Link>
    </>
  );
}

ComBtn.propTypes = {
  NameBtn: PropTypes.string.isRequired,
  link: PropTypes.string
};
