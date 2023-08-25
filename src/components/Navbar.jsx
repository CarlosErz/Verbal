import { Link } from 'react-router-dom';
//import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import logo from '/src/assets/logo.svg';



export function Navbar({ Nombre, avatar}) {

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="Logo" />
          </Link>
          <Link to='/User' className='navbar-user'>
            <p className="name">{Nombre || 'No user'}</p>
            <img
              className="avatar"
              src={avatar || 'https://i.postimg.cc/TPP2gvgV/notFoto.png'}
              alt="Avatar"
            />
          </Link>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  Nombre: PropTypes.string,
  avatar: PropTypes.string,
  avatarOnError: PropTypes.string,

};
