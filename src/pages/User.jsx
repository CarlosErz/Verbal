import { useState } from 'react';
import PropTypes from 'prop-types';
import './Userstyle.css';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { getAuth, signOut, deleteUser } from "firebase/auth";

export function User({ loggedInUser }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem('loggedInUser');
        //setLoggedInUser(null);
        navigate('/')

        // Lógica adicional si es necesario
      })
      .catch(error => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  const handleConfirmDeleteAccount = () => {
    const auth = getAuth();
    deleteUser(auth.currentUser)
      .then(() => {
        localStorage.removeItem('loggedInUser');
        setShowConfirmModal(false);
        navigate('/')
        // Lógica adicional si es necesario
      })
      .catch(error => {
        console.error("Error al eliminar cuenta:", error);
      });
  };

  return (
    <div className='User'>
      <h1 className="title">Perfil</h1>
      <div className="user-container">
        <img className='user-avatar' src={loggedInUser && loggedInUser.photoURL ? loggedInUser.photoURL : 'https://i.postimg.cc/TPP2gvgV/notFoto.png'}
          alt="Avatar" />
        <p className="user-name">{loggedInUser && loggedInUser.displayName
        ||'No user'
        }</p>
      </div>
      <div className="user-btns">
        <button className="user-delete" onClick={() => setShowConfirmModal(true)}>Eliminar Cuenta</button>
        <button className="user-logout" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      {showConfirmModal && (
        <div className="confirm-modal">
          <p>¿Estás seguro de que deseas eliminar tu cuenta?</p>
          <button onClick={handleConfirmDeleteAccount}>Sí, eliminar</button>
          <button onClick={() => setShowConfirmModal(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

User.propTypes = {
  loggedInUser: PropTypes.object,
};
