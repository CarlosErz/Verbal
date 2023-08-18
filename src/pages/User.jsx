//import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Userstyle.css'

export function User({ loggedInUser}) {


  const handleLogout = () => {
    window.FB.logout(function () {
      localStorage.removeItem('loggedInUser');
    });

  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('loggedInUser');
    // Realiza las acciones adicionales para eliminar la cuenta del usuario
  };

  return (
    <div className='User'>
      <h1 className="title">Perfil</h1>
      <div className="user-container">
        <img className='user-avatar' src={loggedInUser && loggedInUser.photoURL} />
        <p className="user-name">{loggedInUser && loggedInUser.displayName}</p>
      </div>
      <div className="user-btns">
        <button className="user-delete" onClick={handleDeleteAccount}>Eliminar Cuenta</button>
        <button className="user-logout" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
}

User.propTypes = {
  Avatar: PropTypes.string,
  Nombre: PropTypes.string,
  loggedInUser: PropTypes.object,
  userName: PropTypes.string,
  userAvatar: PropTypes.string,
  setLoggedInUser: PropTypes.func,
}

