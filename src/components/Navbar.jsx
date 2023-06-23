import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '/src/assets/logoContorno.svg';
export function Navbar({ Avatar, Nombre }) {
  return (
    Nombre = 'Hasbulla',
    Avatar = 'https://unavatar.io/HasbullaHive',
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="navbar-user">
            <p className="name">{Nombre}</p>
            <img className='avatar' src={Avatar} alt="Avatar" />

          </div>

        </div>
      </nav>
    </>
  )
}
Navbar.propTypes = {
  Avatar: PropTypes.string.isRequired,
  Nombre: PropTypes.string.isRequired,
};