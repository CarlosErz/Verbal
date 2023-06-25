
export function handleRegister() {
  // Lógica para el registro
  localStorage.removeItem('loggedInUser');
}

export function handleFacebookLogin() {
  window.FB.login(function(response) {
    if (response.status === 'connected') {
      // El usuario ha iniciado sesión y ha autorizado la aplicación
      window.FB.api('/me', { fields: 'id, name, picture' }, function(userData) {
        const { id, name, picture } = userData;
        console.log(name, picture.data.url);
        const user = { id, name, picture: picture.data.url };
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Utiliza la clave 'loggedInUser'
      });
    } else {
      // El usuario no ha iniciado sesión o no ha autorizado la aplicación
      console.log('Error de inicio de sesión');
    }
  }, { scope: 'public_profile' });
}
