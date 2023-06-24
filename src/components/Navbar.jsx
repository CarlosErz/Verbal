import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import logo from '/src/assets/logoContorno.svg';

export function Navbar({ Nombre, avatar }) {
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUserName(user.name);
      setUserAvatar(user.picture);
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="navbar-user">
            <p className="name">{userName || Nombre}</p>
            <img className="avatar" src={userAvatar || avatar} alt="Avatar" />
          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  Nombre: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
