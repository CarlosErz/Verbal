import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '/src/assets/logoContorno.svg';

export function Navbar({ Nombre }) {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    // Obtener los datos del usuario desde Facebook
    window.FB.api('/me?fields=picture', response => {
      if (response && !response.error) {
        setAvatar(response.picture.data.url);
      }
    });
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="navbar-user">
            <p className="name">{Nombre}</p>
            <img className="avatar" src={avatar} alt="Avatar" />
          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  Nombre: PropTypes.string.isRequired,
};
