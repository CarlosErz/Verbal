import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Userstyle.css'

export function User({ Avatar, Nombre }) {
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
        <img className='user-avatar' src={userAvatar || Avatar} />
        <p className="user-name">{userName || Nombre}</p>
      </div>
      <div className="user-btns">
        <button className="user-delete" onClick={handleDeleteAccount}>Eliminar Cuenta</button>
        <button className="user-logout" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
}

User.propTypes = {
  Avatar: PropTypes.string.isRequired,
  Nombre: PropTypes.string.isRequired,
}

